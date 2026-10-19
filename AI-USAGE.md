# Phần nào do AI tạo

Đề bài yêu cầu ghi rõ phần nội dung do AI tạo. Bảng này cập nhật theo từng file.

Quy ước:
- **Người**: tự làm (dùng thử app, phỏng vấn, thử prototype, quyết định).
- **AI hỗ trợ**: AI soạn khung hoặc bản nháp, mình sửa và chịu trách nhiệm nội dung.
- **AI tạo**: nội dung do AI sinh ra, mình kiểm tra lại; ghi rõ cách kiểm tra.

Công cụ: Claude (Anthropic) qua Claude Code; Codex (OpenAI) hỗ trợ triển khai web, cập nhật README và thiết kế lại slide HTML. Mobbin MCP được dùng để tìm mẫu tham khảo giao diện.

| File | Mức | Ghi chú |
|---|---|---|
| `01-phong-van/consent-script.md` | AI hỗ trợ | Khung lời xin đồng ý theo mục 6.4 của đề |
| `01-phong-van/logs/_template-Px.md` | AI hỗ trợ | Mẫu theo Interview Record và Practice Reflection của Day 17; nội dung từng log do mình ghi |
| `01-phong-van/myvinmec-app-trial.md` | AI hỗ trợ (khung) | Thao tác và quan sát do mình tự dùng thử |
| `01-phong-van/recruiting.md` | AI hỗ trợ | Tiêu chí và tin nhắn mời; danh sách hẹn do mình điền |
| `01-phong-van/interview-guide.md` | AI hỗ trợ | AI soạn nháp theo Chặng 1–2 của Day 17 (chuỗi Solution → Evidence, Evidence Map, Big 3, Conversation Guide) và The Mom Test. Khoảnh khắc, giả thuyết, Big 3 và lịch sử sửa do mình chốt |
| `01-phong-van/phieu-hoi-nguoi-nha.md`, `tao-google-form.gs` | AI hỗ trợ | Rút gọn từ interview guide; script tạo Google Form để ghi phiếu |
| `01-phong-van/logs/P3.md` | AI hỗ trợ (chép lại) | Nội dung từ phiếu Google Form người phỏng vấn tự điền sau buổi; AI chỉ chép sang khung, không thêm lời |
| `01-phong-van/review-store-tom-tat.md` | AI hỗ trợ | AI thu thập và phân loại 21 review công khai; mình đọc lại bảng và trích dẫn |
| `01-phong-van/tong-hop-insight.md` | AI hỗ trợ | AI dựng bảng Observed → Insight từ log, ghi chép dùng thử và review; mình kiểm từng dòng với nguồn |
| `02-journey-map/` | AI tạo | AI vẽ SVG/PNG từ dữ liệu trong `01-phong-van/`; ô không có dữ liệu để xám. Mình kiểm từng ô với log |
| `03-need-statement/README.md` | AI hỗ trợ | AI soạn các phương án; mình chọn câu cuối và kiểm theo tiêu chí Biodesign |
| `04-best-practice/README.md` | AI tạo | AI tìm nguồn và soạn bản nháp; cần đọc lại nguồn gốc trước khi present |
| `05-prototype/` (code, `prompts/system-prompt.md`) | AI tạo | AI viết code và system prompt. Mình chạy thử luồng bấm và chế độ không AI. **Chế độ AI chưa chạy** (chưa có API key). Giao diện được làm lại theo mẫu tìm trên Mobbin (Apple Health, Bevel, Keeta, Blue Apron); chỉ lấy bố cục, không chép ảnh hay logo |
| `06-rui-ro-dao-duc/README.md` | AI hỗ trợ | AI soạn bảng rủi ro; cột trạng thái ghi rõ cái nào đã có, cái nào mới là đề xuất |
| `07-coach-plan/README.md` | AI hỗ trợ | AI soạn khung theo runbook coach Track 1; lịch và cách gỡ dựa trên chỗ mình kẹt |
| `README.md` | AI hỗ trợ | Soạn từ các thư mục trên; Codex cập nhật liên kết web cho người xem repo public |
| `slides/slides.html`, `slides/slides.css`, `slides/slides.js` | AI tạo (thiết kế và code), AI hỗ trợ (nội dung) | Codex thiết kế lại bản trình bày web từ 10 slide gốc; tham khảo [SSENSE](https://mobbin.com/sites/sections/4de98a06-dbff-4e54-83c6-a301c519bba0) và [Airtable](https://mobbin.com/sites/sections/307eaec5-c6fd-4ecc-aeff-c1355176db87) qua Mobbin MCP, không chép ảnh hoặc logo. Giữ nguyên giới hạn bằng chứng; kiểm tra hiển thị và thao tác bằng trình duyệt, không tính là thử với người dùng thật |
| `slides.pdf` | AI hỗ trợ | Bản PDF lưu trữ trước lần thiết kế lại web; bản hiện hành là slide HTML |
| `deploy/`, `docs/deployment.md` | AI tạo | Cấu hình phục vụ prototype và slide trên VPS; kiểm tra HTTPS và dịch vụ, không kiểm chứng lợi ích với người dùng |

## Chỗ AI làm sai hoặc hời hợt, và đã sửa

- Bản nháp README prototype ghi nhầm ngõ cụt "tạo hồ sơ mới" là nhiệm vụ T2. Kiểm lại ghi chép thì đó là T3, đã sửa.
- AI đề xuất tuyển thêm người cho đủ 3 buổi phỏng vấn sát hạn nộp. Không kịp, nên mình quyết định ghi rõ giới hạn bằng chứng thay vì điền cho đủ.
- AI không tự đánh giá được cảm xúc của P3 từ phiếu (phiếu không ghi từ ngữ cảm xúc). Điểm cảm xúc trên journey map là suy luận, đã ghi rõ là suy luận.

## Không có phần nào do AI bịa

Không có trích dẫn, log phỏng vấn hay log thử nghiệm nào do AI tạo ra. Phần chưa làm (P1, P2, thử prototype với người dùng) được ghi là **chưa làm**.
