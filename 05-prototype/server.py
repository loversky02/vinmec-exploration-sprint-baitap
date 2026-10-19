"""Prototype server: serves the mock app and proxies the assistant to the Claude API.

Run:  python3 server.py   (open http://localhost:8770)
With ANTHROPIC_API_KEY set, the assistant uses Claude. Without it, a rule-based
fallback answers so the clickable flow still works; the UI labels which mode is on.
Only Python's standard library is used.
"""

import json
import os
import re
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8770"))
MODEL = os.environ.get("CLAUDE_MODEL", "claude-sonnet-5-5")
API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
SYSTEM_PROMPT = (ROOT / "prompts" / "system-prompt.md").read_text(encoding="utf-8")
HOTLINE = "1900 xxxx (số giả trong prototype)"

# Checked before any model call: an emergency never depends on the model's judgment.
EMERGENCY = re.compile(
    r"khó thở|đau ngực|ngất|co giật|chảy máu nhiều|bất tỉnh|đột quỵ|méo miệng|tự tử|muốn chết|cấp cứu",
    re.IGNORECASE,
)
MEDICAL = re.compile(
    r"chỉ số|cao không|thấp không|có sao không|bình thường không|nguy hiểm|bị bệnh|uống thuốc|liều|chẩn đoán|ung thư",
    re.IGNORECASE,
)

EMERGENCY_REPLY = {
    "tra_loi": "Nếu bạn hoặc người bên cạnh đang có dấu hiệu nguy hiểm, hãy gọi ngay 115 hoặc tới khoa Cấp cứu gần nhất. "
    "Mình chỉ hỗ trợ tìm kết quả trong app, không xử lý được tình huống khẩn cấp.",
    "nut": [{"nhan": "Gọi 115", "toi": "goi_115"}],
    "che_do": "an_toan",
}


def fallback_reply(question: str, state: dict) -> dict:
    """Rule-based answers used when no API key is configured."""
    ho_so = state.get("ho_so", {})
    ket_qua = state.get("ket_qua", [])
    if MEDICAL.search(question):
        return {
            "tra_loi": "Mình không giải thích được nội dung hay chỉ số trong kết quả, việc này cần bác sĩ. "
            "Bạn có thể đặt lịch hỏi lại bác sĩ hoặc gọi tổng đài.",
            "nut": [{"nhan": "Đặt lịch hỏi bác sĩ", "toi": "dat_lich"}, {"nhan": "Gọi tổng đài", "toi": "tong_dai"}],
        }
    if not ho_so.get("da_ket_noi"):
        lead = (
            "Bạn đã từng khám nhưng hồ sơ khám chưa được kết nối với tài khoản này, nên app chưa hiện kết quả."
            if ho_so.get("da_tung_kham")
            else "Tài khoản này chưa kết nối với hồ sơ khám nào, nên chưa có kết quả để hiện."
        )
        return {
            "tra_loi": lead + " Bạn cần mã y tế in trên phiếu khám hoặc hóa đơn để kết nối.",
            "nut": [{"nhan": "Kết nối hồ sơ khám", "toi": "ket_noi"}],
        }
    pending = [k for k in ket_qua if k.get("trang_thai") != "da_co"]
    ready = [k for k in ket_qua if k.get("trang_thai") == "da_co"]
    parts = []
    if ready:
        parts.append("Đã có: " + ", ".join(k["ten"] for k in ready) + ".")
    for k in pending:
        when = f", dự kiến {k['du_kien']}" if k.get("du_kien") else ""
        label = "đang chờ bác sĩ duyệt" if k["trang_thai"] == "cho_bac_si_duyet" else "đang xử lý"
        parts.append(f"{k['ten']} {label}{when}.")
    if not parts:
        parts.append("Hiện chưa có kết quả nào gắn với hồ sơ này.")
    return {"tra_loi": " ".join(parts), "nut": [{"nhan": "Mở Kết quả của tôi", "toi": "ket_qua"}]}


def claude_reply(question: str, history: list, state: dict) -> dict:
    messages = []
    for turn in history[-6:]:
        if turn.get("role") in ("user", "assistant") and turn.get("text"):
            messages.append({"role": turn["role"], "content": turn["text"]})
    messages.append(
        {"role": "user", "content": f"APP_STATE:\n{json.dumps(state, ensure_ascii=False)}\n\nCâu hỏi: {question}"}
    )
    body = json.dumps(
        {"model": MODEL, "max_tokens": 400, "system": SYSTEM_PROMPT, "messages": messages}
    ).encode("utf-8")
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=body,
        headers={"content-type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read())
    text = "".join(b.get("text", "") for b in data.get("content", []) if b.get("type") == "text")
    match = re.search(r"\{.*\}", text, re.DOTALL)
    return json.loads(match.group(0)) if match else {"tra_loi": text.strip(), "nut": []}


def keep_valid_buttons(reply: dict, state: dict) -> dict:
    """Drop any button pointing to a screen the app does not have."""
    allowed = {s["id"] for s in state.get("man_hinh", [])} | {"goi_115"}
    buttons = reply.get("nut") or []
    reply["nut"] = [b for b in buttons if isinstance(b, dict) and b.get("toi") in allowed][:2]
    reply["tra_loi"] = str(reply.get("tra_loi", "")).strip() or "Mình chưa trả lời được, bạn thử hỏi lại nhé."
    return reply


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "app"), **kwargs)

    def end_headers(self):
        # Prototype files change often during testing; never serve a stale copy.
        self.send_header("cache-control", "no-store")
        super().end_headers()

    def do_GET(self):
        if self.path == "/api/mode":
            return self._json({"ai": bool(API_KEY), "model": MODEL if API_KEY else None})
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/chat":
            return self.send_error(404)
        length = int(self.headers.get("content-length", "0"))
        payload = json.loads(self.rfile.read(length) or b"{}")
        question = str(payload.get("question", ""))[:500]
        state = payload.get("state", {})
        if EMERGENCY.search(question):
            return self._json(EMERGENCY_REPLY)
        if API_KEY:
            try:
                reply = claude_reply(question, payload.get("history", []), state)
                reply["che_do"] = "ai"
            except (urllib.error.URLError, ValueError, KeyError, TimeoutError) as exc:
                reply = fallback_reply(question, state)
                reply["che_do"] = "du_phong"
                reply["loi"] = type(exc).__name__
        else:
            reply = fallback_reply(question, state)
            reply["che_do"] = "khong_ai"
        self._json(keep_valid_buttons(reply, state))

    def _json(self, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        # Questions may contain personal details; log only method and path.
        if args and isinstance(args[0], str):
            print(args[0].split(" HTTP")[0])


if __name__ == "__main__":
    mode = f"AI ({MODEL})" if API_KEY else "không có AI (chưa đặt ANTHROPIC_API_KEY)"
    print(f"Prototype: http://localhost:{PORT}  ·  trợ lý: {mode}")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
