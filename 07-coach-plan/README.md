# Mình sẽ coach một nhóm làm bài này thế nào

> AI hỗ trợ: Claude soạn khung từ runbook coach Track 1 (Day 17–19) và những chỗ chính mình đã kẹt khi làm bài. Lịch, cách gỡ và tiêu chí do mình chốt.

**Mục tiêu cho nhóm K4:** cuối tuần, nhóm có một need statement mà **mỗi thành phần chỉ được về bằng chứng thật**, và một prototype mà **người ngoài nhóm tự dùng được**. Số lượng tính năng không quan trọng.

## Lịch 1 tuần (mỗi ngày có tiêu chí xong)

| Ngày | Nhóm làm | Xong khi | Coach kiểm |
|---|---|---|---|
| T2 | Mỗi người tự dùng thử app 30 phút theo 6 nhiệm vụ; chọn **một** khoảnh khắc | Có ghi chép thao tác + ảnh đã che thông tin; khoảnh khắc chọn có ít nhất 2 bằng chứng | Khoảnh khắc là việc người bệnh **đã làm**, không phải tính năng nhóm muốn làm |
| T2 tối | **Mời phỏng vấn ngay**, mời gấp đôi số cần (6–8 người cho 3 buổi) | Có lịch hẹn | Danh sách hẹn, không chờ tới T4 |
| T3–T4 | Phỏng vấn ≥3 người theo The Mom Test; ghi log trong ngày | Mỗi log có đồng ý, hành vi quá khứ, ≥1 cách xoay xở (workaround) | **Gate 1**: đọc 1 log/người. Câu hỏi có dẫn dắt không? Có "lần gần nhất" không? |
| T4 | Tổng hợp: Observed → Interpreted; journey map | Mỗi insight ghi nguồn và độ mạnh | Tách được "người dùng làm" và "nhóm đoán" |
| T5 | Need statement (Biodesign); 3 best practice | Need không chứa giải pháp; mỗi best practice có nguồn và bài học "lấy / không lấy" | Hỏi: "bỏ chữ AI đi thì câu này còn đúng không?" |
| T6 | Prototype; viết rủi ro **trước** khi viết prompt | Người ngoài nhóm mở, bấm, reset được mà không cần ai chỉ | **Gate 2**: coach tự thử như người lạ |
| T7 | Thử với 2–3 người ngoài nhóm; sửa 1 điều | Có feedback note từng người + đúng **một** Next Change | Next Change dẫn về được quan sát cụ thể |
| CN | Repo, slides ≤10, tập present | Không còn chỗ trống mẫu (`____`, TODO) | Hỏi: "Với 3 người thử, đã chứng minh chưa?" Câu đúng: **chưa** |

## Khi nhóm kẹt

| Tình huống | Dấu hiệu | Coach làm gì |
|---|---|---|
| **Không tuyển đủ người** (mình đã gặp: hạn nộp chỉ có 1/3 buổi) | Tới T3 chưa có lịch hẹn | Tuyển song song từ T1. Nếu vẫn thiếu: dùng nguồn phụ (tự dùng thử, review store) nhưng **ghi rõ giới hạn**, không điền cho đủ. Thiếu mà trung thực tốt hơn đủ mà bịa |
| Nhóm nhảy thẳng vào giải pháp AI | Need statement có chữ "chatbot", "app", "AI" | Cho viết lại câu bằng hành vi người dùng; giải pháp để vào "bãi đỗ" |
| Câu hỏi phỏng vấn kiểu "bạn có muốn…" | Log toàn ý kiến, không có chuyện đã xảy ra | Cùng nhóm sửa 3 câu thành "lần gần nhất bạn… thì sao?" rồi thử lại với 1 người |
| Bằng chứng mâu thuẫn giữa các nguồn | Phỏng vấn nói A, review nói B | Không chọn bên. Ghi cả hai, xem nguồn nào gần khoảnh khắc hơn, đưa vào "Still Unproven" |
| Prototype phình to | Làm thêm màn đặt lịch, đăng nhập… | Hỏi: "màn này kiểm giả thuyết nào?" Không trả lời được thì cắt. Giảm độ hoàn thiện, không cắt buổi thử |
| Một người làm hết | Log và code chỉ một người viết | Chia theo bằng chứng: mỗi người sở hữu 1 buổi phỏng vấn và 1 buổi thử |
| Dùng AI rồi chép nguyên | Trích dẫn "quá đẹp", số liệu không có nguồn | Yêu cầu chỉ ra nguồn gốc từng câu; mọi phần AI viết phải ghi trong AI-USAGE |

## Kiểm tra chất lượng (checklist trước khi nộp)

- [ ] Mỗi trích dẫn có người nói (P1…), không trích dẫn nào do AI tạo.
- [ ] Need statement: không giải pháp; 3 thành phần dẫn về được log.
- [ ] Journey map đánh dấu điểm đau, và mỗi điểm đau có nguồn.
- [ ] Prototype: người lạ dùng được; có đường khẩn cấp; AI không giải thích chỉ số.
- [ ] Log thử: ai thử, làm gì, gặp gì, sửa gì sau đó. Quan sát tách khỏi diễn giải.
- [ ] Có mục "Still Unproven" và không có chữ "đã chứng minh / validated".
- [ ] Không có tên thật, số điện thoại, ảnh giấy tờ y tế trong repo.

**Câu coach hỏi ở buổi present:** (A) Bằng chứng gốc là gì, ai nói? (B) Vì sao chọn cách chia việc người–AI này? (C) Người thử làm gì đầu tiên, khựng ở đâu? (D) Sửa gì tiếp, và còn điều gì chưa biết?
