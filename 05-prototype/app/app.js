// Clickable mock of a "Kết quả của tôi" flow plus a state-aware assistant.
// State lives in memory only; reloading the page resets it.

const $ = (sel) => document.querySelector(sel);
let state = null;
let history = [];
const sessionLog = [];

function log(type, detail) {
  sessionLog.push({ t: new Date().toISOString().slice(11, 19), type, detail });
}

const STATUS = {
  dang_xu_ly: { label: "Đang xử lý", step: 1 },
  cho_bac_si_duyet: { label: "Đã xong, chờ bác sĩ duyệt", step: 2 },
  da_co: { label: "Đã có", step: 3 },
};

function loadScenario(key) {
  const s = SCENARIOS[key];
  state = { key, ho_so: structuredClone(s.ho_so), ket_qua: structuredClone(s.ket_qua) };
  history = [];
  $("#msgs").innerHTML = "";
  $("#scenario-note").textContent = s.ghi_chu;
  log("scenario", key);
  go("home");
}

function appState() {
  return { ho_so: state.ho_so, ket_qua: state.ket_qua, man_hinh: SCREENS };
}

const STEPS = ["Lấy mẫu", "Xử lý", "Bác sĩ duyệt", "Có kết quả"];

function tracker(status) {
  const n = STATUS[status].step;
  return `<div class="track">${STEPS.map((l, i) => `<div class="${i <= n ? "on" : ""}${i === n ? " now" : ""}">${l}</div>`).join("")}</div>`;
}

function resultCard(r) {
  const done = r.trang_thai === "da_co";
  const eta = !done && r.du_kien ? `<p class="eta">Dự kiến có kết quả<b>${r.du_kien}</b></p>` : "";
  const open = done ? `<button class="ghost" data-open="${r.ten}">Xem kết quả</button>` : "";
  return `<div class="card result ${r.trang_thai}">
    <div class="row"><div><div class="card-title">${r.ten}</div><div class="date">Lấy mẫu ${r.ngay}</div></div>
    <span class="pill ${r.trang_thai}">${STATUS[r.trang_thai].label}</span></div>
    ${eta}${tracker(r.trang_thai)}${open}</div>`;
}

function linkPrompt() {
  const why = state.ho_so.chon_nham_tao_moi
    ? "Bạn đã tạo hồ sơ mới, nhưng nếu bạn <b>đã từng khám</b> thì vẫn kết nối được hồ sơ khám cũ."
    : "Kết quả chỉ hiện sau khi tài khoản được <b>kết nối với hồ sơ khám</b>.";
  return `<div class="card notice"><div class="head"><span class="icon">!</span><div class="card-title">Chưa thấy kết quả?</div></div>
    <p>${why}</p><p class="muted small">Cần: mã y tế in trên phiếu khám hoặc hóa đơn.</p>
    <button class="primary" data-go="ket_noi">Kết nối hồ sơ khám</button></div>`;
}

const ICONS = {
  "Đặt lịch hẹn": '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M12 13v4M10 15h4"/>',
  "Kết quả của tôi": '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  "Lịch hẹn": '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  "Đơn thuốc": '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 9h4M12 7v4M9 15h6"/>',
  "Sổ tiêm": '<path d="M18 2l4 4M15 5l4 4M7 13l4 4M3 21l4-4M14 6L6 14l4 4 8-8z"/>',
  "Nhắc uống thuốc": '<rect x="3" y="9" width="18" height="7" rx="3.5"/><path d="M12 9v7"/>',
};

const RENDER = {
  home() {
    const linked = state.ho_so.da_ket_noi;
    const total = state.ket_qua.length;
    const ready = state.ket_qua.filter((r) => r.trang_thai === "da_co").length;
    const next = state.ket_qua.find((r) => r.trang_thai !== "da_co" && r.du_kien);
    const summary = !linked ? linkPrompt() : total
      ? `<div class="card hero" data-go="ket_qua"><div class="row"><b>Kết quả của tôi</b><span class="link">Xem ›</span></div>
          <div class="big">${ready}/${total}</div><div class="muted">kết quả đã có</div>
          <div class="bar"><i style="width:${(100 * ready) / total}%"></i></div>
          ${next ? `<div class="small">Tiếp theo: ${next.ten}, ${next.du_kien}</div>` : ""}</div>`
      : `<div class="card ok-card">Hồ sơ đã kết nối. Chưa có kết quả nào.</div>`;
    const go = { "Kết quả của tôi": "ket_qua", "Đặt lịch hẹn": "dat_lich" };
    const tiles = Object.keys(ICONS).map((t) => `<div class="tile" ${go[t] ? `data-go="${go[t]}"` : ""}>
      <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICONS[t]}</svg></span>${t}</div>`).join("");
    return summary + `<h3>Dịch vụ</h3><div class="grid">${tiles}</div>`;
  },
  ket_qua() {
    if (!state.ho_so.da_ket_noi) return linkPrompt();
    if (!state.ket_qua.length) return `<div class="card">Chưa có kết quả nào gắn với hồ sơ này.</div>`;
    return `<p class="intro muted">Kết quả hiện ở đây ngay khi bác sĩ duyệt. Trạng thái cập nhật theo từng bước.</p>` +
      state.ket_qua.map(resultCard).join("");
  },
  ket_noi() {
    if (state.ho_so.da_ket_noi) return `<div class="card ok-card">Tài khoản đã kết nối hồ sơ khám.</div>`;
    return `<div class="card"><div class="card-title">Kết nối hồ sơ khám</div>
      <p class="muted">Sau khi kết nối, kết quả xét nghiệm và chụp chiếu sẽ hiện trong mục Kết quả.</p>
      <p class="hint">Prototype: gõ dãy số giả bất kỳ, <b>không nhập mã thật</b>.</p>
      <form id="link-form"><label>Mã y tế (in trên phiếu khám / hóa đơn)<input required id="pid" placeholder="vd 123456"></label>
      <label>Mã OTP gửi về số điện thoại đã đăng ký khi khám<input required id="otp" placeholder="vd 0000"></label>
      <button class="primary">Kết nối</button></form>
      <p class="muted small">Không có mã y tế hoặc không nhận được OTP? <a href="#" class="link" data-go="tong_dai">Gọi tổng đài</a></p></div>`;
  },
  thong_bao() {
    const linked = state.ho_so.da_ket_noi;
    const res = linked ? NOTIFICATIONS.ket_qua.map((n) => `<div class="card" data-go="${n.di}"><span>${n.text}</span><span class="chev">›</span></div>`).join("")
      : `<div class="card muted">Chưa có thông báo kết quả vì hồ sơ chưa kết nối.</div>`;
    return `<h3>Kết quả</h3><div class="list">${res}</div><h3>Ưu đãi</h3>` +
      NOTIFICATIONS.uu_dai.map((t) => `<div class="card muted small">${t}</div>`).join("");
  },
  ho_so() {
    const fam = state.ho_so.nguoi_than.length ? state.ho_so.nguoi_than.join(", ") : "Chưa có";
    const link = state.ho_so.da_ket_noi ? `<div class="card ok-card">Đã kết nối hồ sơ khám</div>` : linkPrompt();
    return `${link}<div class="list"><div class="card">Thông tin cá nhân<span class="chev">›</span></div>
      <div class="card">Thông tin sức khỏe (tự khai)<span class="chev">›</span></div>
      <div class="card">Hồ sơ người thân: ${fam}<span class="chev">›</span></div></div>`;
  },
  dat_lich() {
    return `<div class="card">Màn đặt lịch (giữ như app hiện tại, ngoài phạm vi prototype).</div>`;
  },
  tong_dai() {
    return `<div class="card">Tổng đài: 1900 xxxx (số giả trong prototype).</div>`;
  },
  // In-app viewer instead of a native alert(): some browsers block dialogs.
  xem_ket_qua() {
    const r = state.ket_qua.find((k) => k.ten === state.dang_xem);
    if (!r) return RENDER.ket_qua();
    return `<button class="link" data-go="ket_qua">‹ Quay lại danh sách</button>
      <div class="card result ${r.trang_thai}">
        <div class="row"><div><div class="card-title">${r.ten}</div><div class="date">Lấy mẫu ${r.ngay}</div></div>
        <span class="pill ${r.trang_thai}">${STATUS[r.trang_thai].label}</span></div>
        <div class="file"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICONS["Kết quả của tôi"]}</svg></span>
          <div><b>File kết quả (mô phỏng)</b><div class="muted small">PDF · đã được bác sĩ duyệt</div></div></div>
        <p class="hint">Prototype không hiển thị chỉ số. Bác sĩ sẽ giải thích ở buổi hẹn trả kết quả.</p>
        <button class="primary" data-go="dat_lich">Đặt lịch hỏi bác sĩ</button></div>`;
  },
  goi_115() {
    return `<div class="card notice"><div class="head"><span class="icon">!</span><div class="card-title">Gọi cấp cứu 115</div></div>
      <p>Ở app thật, nút này gọi ngay 115. Prototype không thực hiện cuộc gọi.</p></div>`;
  },
};

const EXTRA_TITLES = { xem_ket_qua: "Chi tiết kết quả", goi_115: "Cấp cứu" };

function go(id) {
  if (!RENDER[id]) id = "home"; // unknown target never breaks the screen
  const screen = SCREENS.find((s) => s.id === id);
  $("#title").textContent = screen ? screen.ten.split(" (")[0] : EXTRA_TITLES[id] || "";
  $("#screen").innerHTML = RENDER[id]();
  $("#screen").scrollTop = 0;
  const tab = id === "xem_ket_qua" ? "ket_qua" : id;
  document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("active", b.dataset.go === tab));
  log("screen", id);
}

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-go]");
  if (target) {
    e.preventDefault();
    if (target.closest("#chat")) {
      log("chat_button", target.dataset.go);
      $("#chat").classList.add("hidden");
    }
    go(target.dataset.go);
  }
  const open = e.target.closest("[data-open]");
  if (open) {
    log("open_result", open.dataset.open);
    state.dang_xem = open.dataset.open;
    go("xem_ket_qua");
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "link-form") {
    e.preventDefault();
    state.ho_so.da_ket_noi = true;
    if (!state.ket_qua.length) state.ket_qua = structuredClone(SCENARIOS.dang_cho.ket_qua);
    log("linked", "ok");
    go("ket_qua");
  }
});

// Assistant
function bubble(role, text, buttons = []) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  buttons.forEach((b) => {
    const btn = document.createElement("button");
    btn.className = "link";
    btn.dataset.go = b.toi;
    btn.textContent = b.nhan + " ›";
    div.appendChild(btn);
  });
  $("#msgs").appendChild(div);
  $("#msgs").scrollTop = 1e6;
}

async function ask(question) {
  bubble("user", question);
  log("ask", question);
  const pending = document.createElement("div");
  pending.className = "msg bot muted";
  pending.textContent = "…";
  $("#msgs").appendChild(pending);
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question, history, state: appState() }),
    });
    const reply = await res.json();
    pending.remove();
    bubble("bot", reply.tra_loi, reply.nut);
    log("answer", { mode: reply.che_do, text: reply.tra_loi, buttons: reply.nut });
    history.push({ role: "user", text: question }, { role: "assistant", text: reply.tra_loi });
  } catch {
    pending.textContent = "Không kết nối được máy chủ prototype. Chạy python3 server.py rồi tải lại trang.";
  }
}

$("#ask").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = $("#q").value.trim();
  if (q) ask(q);
  $("#q").value = "";
});
$("#fab").onclick = () => { $("#chat").classList.remove("hidden"); log("chat", "open"); };
$("#close-chat").onclick = () => $("#chat").classList.add("hidden");
["Kết quả máu của tôi đâu?", "Khi nào có kết quả?", "Chỉ số này có sao không?"].forEach((c) => {
  const b = document.createElement("button");
  b.textContent = c;
  b.onclick = () => ask(c);
  $("#chips").appendChild(b);
});

// Control panel
const select = $("#scenario");
Object.entries(SCENARIOS).forEach(([k, s]) => select.add(new Option(s.ten, k)));
select.onchange = () => loadScenario(select.value);

const dl = document.createElement("button");
dl.textContent = "Tải log phiên thử (JSON)";
dl.onclick = () => {
  const blob = new Blob([JSON.stringify(sessionLog, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `log-phien-thu-${Date.now()}.json`;
  a.click();
};
$(".panel").appendChild(dl);

fetch("/api/mode").then((r) => r.json()).then((m) => {
  $("#mode").textContent = m.ai ? `Trợ lý: AI đang bật (${m.model})` : "Trợ lý: chế độ không có AI (luật cố định). Đặt ANTHROPIC_API_KEY để bật AI.";
  $("#mode").classList.add(m.ai ? "on" : "off");
}).catch(() => { $("#mode").textContent = "Mở trang qua python3 server.py để dùng trợ lý."; });

const start = new URLSearchParams(location.search).get("s");
select.value = start in SCENARIOS ? start : "chua_ket_noi";
loadScenario(select.value);
