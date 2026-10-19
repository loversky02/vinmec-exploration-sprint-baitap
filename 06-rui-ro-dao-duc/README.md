# 06 – Rủi ro an toàn, đạo đức và cách giảm thiểu

> AI hỗ trợ: Claude soạn bản nháp từ prototype và system prompt; mình đọc lại và chốt. Cột "Trạng thái" ghi rõ biện pháp nào **đã có trong prototype**, biện pháp nào **mới là đề xuất**.

Phạm vi: trợ lý "tìm kết quả" trong [05-prototype](../05-prototype/README.md). Trợ lý chỉ chỉ đường và báo trạng thái; nó không đọc, không giải thích kết quả.

## 1. Mức tự động hóa theo cái giá của sai lầm

| Việc | Nếu AI sai thì sao | Mức cho phép |
|---|---|---|
| Chỉ đường tới màn hình trong app | Người dùng bấm nhầm chỗ, mất vài phút | AI làm, có nút bấm để người dùng tự đi |
| Báo trạng thái kết quả (đang xử lý / chờ duyệt / đã có) | Người dùng chờ sai giờ, hoặc tưởng chưa có trong khi đã có | AI **chỉ đọc lại** dữ liệu hệ thống, không tự suy ra |
| Giải thích chỉ số, chẩn đoán, khuyên dùng thuốc | Người bệnh lo sai, bỏ tái khám hoặc tự điều trị | **Không cho AI làm.** Chuyển sang bác sĩ |
| Tình huống khẩn cấp | Chậm cấp cứu | **Không để model quyết định.** Luật cố định chặn trước |

## 2. Bảng rủi ro

| # | Rủi ro | Ví dụ | Cách giảm | Trạng thái |
|---|---|---|---|---|
| R1 | **Bỏ sót khẩn cấp**: người dùng mô tả triệu chứng nguy hiểm, trợ lý vẫn trả lời chuyện kết quả | "mẹ tôi đang khó thở, kết quả đâu" | Máy chủ bắt từ khóa khẩn cấp **trước khi gọi model**, trả hướng dẫn gọi 115 / tới Cấp cứu, nút "Gọi 115" | Đã có (regex, đã chạy thử với "đau ngực") |
| R2 | Danh sách từ khóa khẩn cấp không đủ (viết tắt, không dấu, mô tả gián tiếp) | "ko thở đc", "mặt tím tái" | Mở rộng từ điển cùng nhân viên y tế; thêm bản không dấu; log riêng các câu bị lọt để bổ sung | Đề xuất |
| R3 | **Giải thích kết quả thay bác sĩ** | "chỉ số này có sao không" | System prompt cấm; chế độ không AI chuyển sang "đặt lịch hỏi bác sĩ / gọi tổng đài"; file kết quả mô phỏng không có chỉ số | Đã có. Chế độ AI **chưa chạy thử** nên chưa biết model có tuân thủ |
| R4 | **Bịa đường đi** (đúng lỗi chatbot thật ở T6) | Chỉ tới "Kết quả cận lâm sàng" không có trong app | Model chỉ nhận danh sách màn hình có thật; máy chủ bỏ mọi nút trỏ tới `id` lạ | Đã có |
| R5 | **Bịa giờ trả kết quả** | "khoảng 2 tiếng nữa" khi hệ thống không có giờ | Prompt cấm đoán, chỉ dùng `du_kien` trong dữ liệu; tình huống 4 có "chưa có giờ dự kiến" để kiểm | Đã có trong prompt; chưa kiểm với model |
| R6 | **Lộ thông tin sức khỏe** của người này cho người khác (máy dùng chung, xem hộ) | Người nhà mở app thấy kết quả không được phép xem | Kết quả của người thân chỉ hiện khi đã được ủy quyền qua hồ sơ người thân; trợ lý chỉ thấy dữ liệu của tài khoản đang đăng nhập | Prototype chỉ mô phỏng (tình huống 4). Luật ủy quyền thật **chưa thiết kế**; cần hỏi Vinmec quy định hiện có |
| R7 | **Gửi dữ liệu sức khỏe ra bên thứ ba** (nhà cung cấp model) | `APP_STATE` có tên xét nghiệm | Chỉ gửi tên loại xét nghiệm và trạng thái, không gửi chỉ số, tên, mã y tế. Dữ liệu sức khỏe là dữ liệu cá nhân nhạy cảm theo Nghị định 13/2023/NĐ-CP, nên bản thật cần đánh giá tác động, đồng ý riêng, và hợp đồng xử lý dữ liệu | Prototype: dữ liệu giả, máy chủ không ghi câu hỏi. Bản thật: đề xuất |
| R8 | **Người dùng nhập thông tin thật** khi thử prototype | Gõ mã y tế thật vào ô kết nối | Cảnh báo ở khung bên trái và ngay trên form; form nhận bất kỳ dãy số nào, không lưu | Đã có |
| R9 | **Tin AI quá mức**: nghĩ trợ lý là kênh chính thức thay bác sĩ | Không đi tái khám vì "app bảo đã có kết quả" | Câu cố định đầu khung chat: chỉ tìm kết quả, không thay bác sĩ, khẩn cấp gọi 115 | Đã có |
| R10 | **Model lỗi hoặc mất mạng** | API timeout | Tự chuyển sang luật cố định và ghi `che_do: du_phong` | Đã có (chưa kích hoạt được vì chưa có key) |
| R11 | **Thông báo kết quả lẫn với quảng cáo** (T5) | Bỏ lỡ "đã có kết quả" | Tab Thông báo tách "Kết quả" khỏi "Ưu đãi" | Đã có trong mock |
| R12 | **Bất bình đẳng tiếp cận**: người lớn tuổi, ít dùng smartphone bị bỏ lại khi kết quả chỉ qua app | Từ 5/2024 phần lớn ca chụp chiếu không in phim | Luôn có đường sang tổng đài; đề xuất giữ kênh SMS/quầy. Chưa phỏng vấn được nhóm này | Một phần |

## 3. Đường chuyển tuyến khẩn cấp

```
Người dùng gõ câu hỏi
  └─ Máy chủ kiểm từ khóa khẩn cấp (không qua model)
       ├─ Có → trả ngay: "gọi 115 hoặc tới khoa Cấp cứu gần nhất" + nút Gọi 115. Dừng.
       └─ Không → model / luật cố định trả lời trong phạm vi "tìm kết quả"
            ├─ Hỏi về chỉ số, bệnh, thuốc → chuyển: Đặt lịch hỏi bác sĩ / Gọi tổng đài
            ├─ Không có đường trong app → nói thẳng là không có + Gọi tổng đài
            └─ Model lỗi → luật cố định
```

Khung chat luôn hiện dòng "Khẩn cấp: gọi 115", kể cả khi người dùng không gõ gì.

## 4. Thiết kế Human-AI

| Khía cạnh | Cách làm trong prototype |
|---|---|
| Expectation (kỳ vọng) | Tên "Trợ lý tìm kết quả", dòng phạm vi cố định, 3 câu gợi ý đều là câu về tìm kết quả |
| Agency (ai quyết) | AI chỉ gợi ý; người dùng tự bấm nút để đi. AI không tự mở màn hình, không tự gửi OTP |
| Uncertainty / evidence | Câu trả lời dựa trên `APP_STATE`; thiếu dữ liệu thì nói "không biết", không đoán |
| Recovery (khi AI sai) | Mọi màn vẫn đi tới được bằng tab và ô ở Trang chủ, không phụ thuộc trợ lý; luôn có nút tổng đài |

## 5. Đạo đức khi làm bài (nghiên cứu người dùng)

- Xin đồng ý trước khi phỏng vấn theo `01-phong-van/consent-script.md`; P3 **không đồng ý cho trích lời**, nên bài không có trích nguyên văn từ P3.
- Chỉ hỏi về trải nghiệm dịch vụ, không hỏi chẩn đoán hay bệnh án. Không ghi tên, không chụp người hay giấy tờ y tế.
- Ảnh chụp app đã che thông tin cá nhân. Review store chỉ trích ≤20 chữ, bỏ tên người viết.
- Không bịa phỏng vấn hay log thử nghiệm: phần chưa làm được ghi là **chưa làm**.

## 6. Kết luận Go / Not Yet / No-Go

**Not Yet.** Prototype đủ để thử với người dùng trong môi trường giả lập. Chưa đủ để đưa lên app thật, vì:
1. Chế độ AI chưa được chạy thử lần nào (R3, R5).
2. Từ điển khẩn cấp chưa được nhân viên y tế duyệt (R2).
3. Luật xem hộ và luồng dữ liệu ra nhà cung cấp model chưa được đánh giá pháp lý (R6, R7).
