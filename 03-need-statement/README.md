# Need statement

Theo mẫu Biodesign: **vấn đề (problem) – nhóm người dùng (population) – kết quả mong muốn (outcome)**. Không nêu giải pháp.

## Need statement

> **Cách để giảm số lần phải gọi tổng đài, quay lại viện hoặc bỏ cuộc trước khi xem được kết quả, cho người bệnh ngoại trú (và người nhà xem hộ) đã làm xét nghiệm hoặc chụp chiếu mà kết quả chỉ trả qua app, khi họ không biết kết quả của mình đang ở trạng thái nào và cần làm gì để xem được.**

| Thành phần | Nội dung | Vì sao chọn như vậy |
|---|---|---|
| Problem | Không biết kết quả đang ở trạng thái nào (chưa có, chờ bác sĩ duyệt, đã có) và cần điều kiện gì để xem (kết nối hồ sơ, xác thực) | Dùng thử T3, T6: không có mục "kết quả", chatbot không nói điều kiện. Review: "không kiếm ra hồ sơ", OTP lỗi, "phải đợi bác sĩ đưa lên" |
| Population | Người bệnh ngoại trú và người nhà xem hộ, có xét nghiệm hoặc chụp chiếu, nhận kết quả qua app | Từ 5/2024 phần lớn ca chụp chiếu ở Vinmec không in phim, app là lối chính. Nhóm "người nhà xem hộ" là giả định, **chưa có ai trong nhóm này được phỏng vấn** |
| Outcome | Ít lần gọi tổng đài, quay lại viện hoặc bỏ cuộc trước khi xem được kết quả | Đo được. Đây là các cách xoay xở xuất hiện trong review |

## Đã kiểm need statement theo tiêu chí

- [x] Không chứa giải pháp: không nhắc app mới, AI, chatbot hay tính năng nào.
- [x] Một vấn đề, một nhóm người, một kết quả đo được.
- [x] Mỗi thành phần dẫn được về bằng chứng trong `01-phong-van/`.
- [ ] Bằng chứng đủ mạnh: **chưa**. Mới có 1 phỏng vấn (P3), và P3 lại ở luồng viện công, không qua app. Phần lớn bằng chứng cho need này đến từ việc tự dùng thử và review.

## Phương án đã cân nhắc và bỏ

| Phương án | Vì sao chưa chọn |
|---|---|
| "…cho người bệnh **không hiểu** kết quả xét nghiệm…" (giả thuyết B) | Chưa có bằng chứng. Người duy nhất cầm được kết quả (P3) được bác sĩ giải thích đủ hiểu |
| "…giảm thời gian **chờ kết quả tại viện**…" (Đ1) | Có thật (P3) nhưng là chuyện vận hành ở viện. Chỉ 1 nguồn |

## Chuỗi bằng chứng

`01-phong-van/tong-hop-insight.md` (I1–I4) → `02-journey-map/` (Đ3) → need statement này.
