# 05 – Prototype: "Kết quả của tôi" và trợ lý tìm kết quả

> AI tạo: Claude viết code và system prompt từ need statement và các phát hiện khi dùng thử app. Mình kiểm tra luồng bằng tay. Đây là bản mô phỏng, **không phải app thật của Vinmec**, toàn bộ dữ liệu là giả.

## Prototype trả lời câu hỏi gì

Need statement ([03](../03-need-statement/README.md)): người bệnh không biết kết quả của mình đang ở trạng thái nào và phải làm gì để xem. Prototype thử một giả thuyết:

> Nếu app cho thấy **điều kiện để xem** (đã kết nối hồ sơ chưa) và **trạng thái từng kết quả** (đang xử lý, chờ bác sĩ duyệt, đã có, giờ dự kiến), và trợ lý **chỉ chỉ đường tới màn hình có thật** theo trạng thái của chính người hỏi, thì người dùng tới được kết quả hoặc biết phải làm gì mà không cần gọi tổng đài.

| Phát hiện khi dùng thử / review | Prototype làm gì |
|---|---|
| Không có mục nào ghi "kết quả" (T3) | Ô "Kết quả của tôi" ở Trang chủ và tab riêng |
| Chatbot chỉ tới mục không tồn tại, không nói điều kiện kết nối hồ sơ (T6) | Trợ lý nhận `APP_STATE`, chỉ được trả nút tới màn có trong danh sách; máy chủ lọc lại nút sai |
| Lỡ bấm "chưa từng khám, tạo hồ sơ mới" thì mất lối kết nối (T3, mới thấy trên 1 tài khoản) | Lối kết nối luôn còn ở Trang chủ, Kết quả, Hồ sơ |
| Thông báo kết quả lẫn trong ưu đãi (T5) | Tab Thông báo tách "Kết quả" khỏi "Ưu đãi" |
| Review: "phải đợi bác sĩ đưa lên", không biết khi nào có | Thanh 4 bước và giờ dự kiến cho từng kết quả |
| Best practice NHS / Cures Act ([04](../04-best-practice/README.md)) | Trạng thái "đã xong, chờ bác sĩ duyệt" thay vì ẩn hoàn toàn |

## Tham khảo giao diện

Bố cục lấy cảm hứng từ các màn tìm trên Mobbin, chỉ mượn cách sắp xếp, không chép ảnh hay logo:

| Mẫu | Lấy gì |
|---|---|
| Apple Health, Bevel (thẻ chỉ số) | Thẻ trắng trên nền xám, mỗi mục một nhãn trạng thái có chấm màu |
| Keeta, Blue Apron, Grab (theo dõi đơn hàng) | Dòng "dự kiến lúc…" in đậm phía trên thanh tiến trình có chấm theo từng bước |
| Noom (danh sách chỉ số) | Viền màu bên trái theo trạng thái để lướt nhanh |

## Chạy

```bash
python3 05-prototype/server.py
```

Mở http://localhost:8770. Chỉ cần Python 3, không cài thêm gói nào.

Muốn bật trợ lý AI thì đặt biến môi trường `ANTHROPIC_API_KEY` trước khi chạy (mặc định dùng model `claude-sonnet-5-5`, đổi bằng `CLAUDE_MODEL`). Không có key thì trợ lý chạy bằng luật cố định; khung bên trái ghi rõ đang ở chế độ nào.

## Cấu trúc

| File | Vai trò |
|---|---|
| `app/index.html`, `app/style.css`, `app/app.js` | Màn hình điện thoại bấm được, khung chọn tình huống, nút tải log phiên thử |
| `app/scenarios.js` | 4 tình huống tài khoản giả: chưa kết nối, lỡ tạo hồ sơ mới, kết quả còn chờ, xem hộ mẹ |
| `prompts/system-prompt.md` | System prompt của trợ lý: chỉ chỉ đường, không giải thích chỉ số, không đoán, trả JSON |
| `server.py` | Phục vụ trang, gọi Claude API, luật dự phòng, kiểm tra khẩn cấp trước khi gọi model |

## Các lớp an toàn

1. **Khẩn cấp không phụ thuộc model.** Câu hỏi có từ như "đau ngực", "khó thở", "co giật" được bắt bằng regex ở máy chủ và trả ngay hướng dẫn gọi 115, không gửi tới model.
2. **Không giải thích kết quả.** System prompt cấm; chế độ không AI chuyển câu hỏi về chỉ số sang "đặt lịch hỏi bác sĩ / gọi tổng đài". File kết quả mô phỏng không có chỉ số.
3. **Không chỉ đường tới màn không có.** Máy chủ bỏ mọi nút trỏ tới `id` không có trong danh sách màn hình, tối đa 2 nút.
4. **Không lưu thông tin cá nhân.** Máy chủ chỉ ghi method và đường dẫn, không ghi câu hỏi. Log phiên thử chỉ nằm trong trình duyệt, người thử tự tải về.

## Đã kiểm gì, chưa kiểm gì

| Hạng mục | Trạng thái |
|---|---|
| Luồng bấm: Trang chủ → Kết nối → Kết quả, đổi 4 tình huống | Đã chạy thử trong trình duyệt (19/10), chạy lại sau khi làm lại giao diện |
| Trợ lý chế độ không AI: chưa kết nối, câu hỏi chỉ số, câu khẩn cấp | Đã chạy thử, trả lời và nút đúng (19/10) |
| Trợ lý chế độ AI (Claude API) | **Chưa chạy**: máy chưa có API key. Chưa biết model có tuân thủ system prompt hay không |
| Thử với người dùng thật (2–3 người) | **Chưa làm** |

Vì chưa ai ngoài nhóm dùng thử, prototype mới chứng minh được là **làm được**, chưa chứng minh được là **giúp được**. Kế hoạch thử nằm ở [07-coach-plan](../07-coach-plan/README.md).

## Cách thử với người dùng (khi có người)

1. Đọc lời xin đồng ý trong `01-phong-van/consent-script.md`, nhắc không nhập thông tin thật.
2. Chọn tình huống 1, giao 3 nhiệm vụ ghi trong mục "Nhiệm vụ cho người thử" ở khung bên trái. Không gợi ý.
3. Ghi: có tới được màn Kết nối không, mất bao lâu, có mở trợ lý không, câu hỏi họ gõ là gì.
4. Bấm "Tải log phiên thử (JSON)" và lưu vào `05-prototype/test-logs/` (tạo thư mục khi có buổi thử đầu tiên).

Tiêu chí: người thử tự tới được màn Kết nối (tình huống 1, 2) hoặc nói đúng giờ dự kiến của xét nghiệm máu (tình huống 3) mà không cần hỏi người hướng dẫn.
