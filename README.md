# Một lần đi khám: khoảnh khắc "nhận kết quả" trên MyVinmec

Bài tập 1 tuần ứng tuyển Vinmec Exploration Sprint. Bản tóm tắt để present: [slides.pdf](slides.pdf).

## Khoảnh khắc đã chọn

**Sau khi khám xong: tìm và xem được kết quả xét nghiệm, chụp chiếu của mình.** Từ 5/2024 phần lớn ca chụp chiếu ở Vinmec không còn in phim, nên app gần như là lối chính để nhận kết quả.

Kết luận chính: vướng nằm ở chỗ **tới được** kết quả, chưa phải ở chỗ **hiểu** kết quả. Khi dùng thử, mình không tìm ra mục nào ghi "kết quả". App không cho biết phải kết nối hồ sơ khám thì mới xem được. Chatbot hiện có lại chỉ đường tới những mục không có trong app.

> **Need statement:** Cách để giảm số lần phải gọi tổng đài, quay lại viện hoặc bỏ cuộc trước khi xem được kết quả, cho người bệnh ngoại trú (và người nhà xem hộ) đã làm xét nghiệm hoặc chụp chiếu mà kết quả chỉ trả qua app, khi họ không biết kết quả của mình đang ở trạng thái nào và cần làm gì để xem được.

## Giới hạn cần đọc trước

- **Mới có 1 buổi phỏng vấn (P3), đề yêu cầu ít nhất 3.** Mình không bịa P1, P2. Để bù, mình dùng thêm hai nguồn và tách riêng từng nguồn: tự dùng thử app, và 21 review trên store.
- **Prototype chưa được thử với người dùng**, và chế độ AI chưa chạy lần nào vì chưa có API key. Prototype mới chứng minh được là làm ra được, chưa chứng minh được là giúp được người dùng.
- Mọi insight là **giả thuyết có bằng chứng ban đầu**, chưa được kiểm chứng.

## Mục lục

| Thư mục | Nội dung |
|---|---|
| [01-phong-van/](01-phong-van/) | [Ghi chép dùng thử app](01-phong-van/myvinmec-app-trial.md) (22 ảnh đã che thông tin), [interview guide](01-phong-van/interview-guide.md), [lời xin đồng ý](01-phong-van/consent-script.md), [log P3](01-phong-van/logs/P3.md), [tóm tắt review store](01-phong-van/review-store-tom-tat.md), [**tổng hợp insight**](01-phong-van/tong-hop-insight.md) |
| [02-journey-map/](02-journey-map/README.md) | Journey map hai luồng (viện công và qua app), đánh dấu điểm đau Đ1–Đ3 |
| [03-need-statement/](03-need-statement/README.md) | Need statement theo mẫu Biodesign, chuỗi bằng chứng, các phương án đã bỏ |
| [04-best-practice/](04-best-practice/README.md) | Cures Act (Mỹ), NHS App (Anh), Stanford (AI nháp, bác sĩ duyệt); bài học cho Vinmec |
| [05-prototype/](05-prototype/README.md) | Prototype bấm được + trợ lý tìm kết quả dựa trên trạng thái tài khoản; system prompt; cách chạy |
| [06-rui-ro-dao-duc/](06-rui-ro-dao-duc/README.md) | 12 rủi ro, đường chuyển tuyến khẩn cấp, thiết kế Human-AI, kết luận Not Yet |
| [07-coach-plan/](07-coach-plan/README.md) | Một trang: mình sẽ coach nhóm K4 làm bài này thế nào |
| [AI-USAGE.md](AI-USAGE.md) | **Phần nào do AI tạo**, mức độ và cách kiểm tra từng file |
| [slides.pdf](slides.pdf) | 10 slide cho buổi present |

## Chạy prototype

**Dùng thử online:** [vinmec.vinunquant.com](https://vinmec.vinunquant.com/) · [Hướng dẫn triển khai](docs/deployment.md). Bản online dùng dữ liệu giả, trợ lý chạy bằng luật cố định; không nhập thông tin thật.

```bash
python3 05-prototype/server.py
```

Mở http://localhost:8770. Thêm `?s=dang_cho` vào URL để mở thẳng tình huống "kết quả còn chờ".

## Ràng buộc đã tuân thủ

Xin đồng ý trước khi phỏng vấn; chỉ hỏi về trải nghiệm dịch vụ; người tham gia ẩn danh (P3); không ghi âm (P3 không đồng ý); không đưa lời khuyên y khoa (prototype cũng không giải thích chỉ số); phần do AI tạo ghi trong [AI-USAGE.md](AI-USAGE.md).
