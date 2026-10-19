# 04 – Best practice quốc tế: nhận kết quả khám / xét nghiệm ngoại trú qua app

> AI tạo: Claude tìm nguồn và soạn bản nháp; cần ứng viên đọc lại nguồn trước khi present.

Khoảnh khắc: bệnh nhân nhận, tìm và biết làm gì tiếp theo với kết quả ngoại trú. Ba thực hành dưới đây gắn với ba nỗi đau đã thấy ở MyVinmec: (1) không biết kết quả nằm đâu, chatbot chỉ đường tới mục không tồn tại khi hồ sơ chưa liên kết; (2) nhiều review thấp sao về OTP/không tìm ra hồ sơ và muốn nhận kết quả sớm; (3) ở bệnh viện công, kết quả đến thẳng bác sĩ và giải thích trực tiếp là đủ.

## 1. Công bố kết quả ngay trên portal (Cures Act, Mỹ)

- **Nơi áp dụng:** các hệ thống y tế Mỹ, theo quy định chống "information blocking" của 21st Century Cures Act (áp dụng cho nhà cung cấp từ 04/2021).
- **Làm gì:** bệnh nhân thường thấy kết quả gần như cùng lúc bác sĩ chỉ định, kể cả khi bác sĩ chưa đọc. ONC chỉ gợi ý các hệ thống nên cho bệnh nhân kiểm soát cách phát hành/thông báo.
- **Bằng chứng:** khảo sát 8.139 bệnh nhân tại 4 trung tâm học thuật Mỹ (Steitz 2023): 95,7% muốn nhận kết quả ngay trên portal, kể cả 95,3% nhóm có kết quả bất thường. Chỉ 7,5% lo hơn sau khi xem; nhóm bất thường lo nhiều hơn (16,5% so với 5,0%). Tỷ lệ phản hồi chỉ 18,8%, mẫu lệch về người có học vấn cao, nên không đại diện. ONC (cơ quan quản lý) ghi nhận nhu cầu thông tin chưa được đáp ứng: một nghiên cứu cho thấy khoảng 57% người xem kết quả đi tìm thêm thông tin, tin nhắn cho phòng khám tăng gần gấp đôi trong 6 giờ sau khi xem.
- **Nguồn:** Steitz et al., *Perspectives of Patients About Immediate Access to Test Results Through an Online Patient Portal*, JAMA Netw Open 2023; ONC blog (healthit.gov) – xem danh sách nguồn.
- **Bài học cho Vinmec/VN:**
  - Review "muốn nhận kết quả ngay, không chờ bác sĩ duyệt" khớp với xu hướng này; nhưng bằng chứng là từ Mỹ, chưa có dữ liệu VN.
  - Thay vì phát hành sốt dẻo mọi thứ, có thể thử: cho bệnh nhân chọn (xem ngay / chờ bác sĩ) và gắn trạng thái "đã có – bác sĩ chưa xem".
  - Kết quả bất thường là nhóm dễ lo nhất, cần kèm hướng dẫn bước tiếp theo (đặt lịch, gọi ai).
- **Không nên chép nguyên:** khung pháp lý Mỹ; mẫu nghiên cứu khác bối cảnh. Dữ liệu sức khỏe là dữ liệu cá nhân nhạy cảm theo Nghị định 13/2023/NĐ-CP, nên mặc định phát hành mọi thứ cần được đánh giá pháp lý/đồng ý riêng.

## 2. Mục "Test results" rõ ràng, có luật phát hành và truy cập hộ (NHS App, Anh)

- **Nơi áp dụng:** NHS App (Anh).
- **Làm gì:** kết quả nằm ở một mục có tên rõ ("Test results"); trang trợ giúp giải thích khi nào kết quả xuất hiện ("thường trong vài ngày"), vì sao có thể không thấy (xét nghiệm do bệnh viện chỉ định nằm ở hệ thống khác; làm tư; xét nghiệm trước 10/2023; bị giữ lại nếu có nguy cơ gây hại) và dặn liên hệ GP nếu lo lắng. Nhân viên phòng khám cân nhắc từng mục khi nhập và có thể ẩn tạm hoặc vĩnh viễn. "Family and carer access" cho người thân xem kết quả, sau khi phòng khám kiểm tra và xin đồng ý; app hiện banner "Acting for" để biết đang xem hộ ai.
- **Bằng chứng:** chủ yếu là tài liệu chính sách/hướng dẫn, không phải kết quả đo hiệu quả. Một tổng quan hệ thống ghi nhận ý kiến bác sĩ trái chiều (có thể tăng lo lắng và khối lượng việc).
- **Bài học cho Vinmec/VN:**
  - Nỗi đau "không biết kết quả ở đâu" và chatbot chỉ đường sai: nên nói rõ điều kiện (cần liên kết hồ sơ trước) và giải thích "vì sao chưa thấy kết quả".
  - Ẩn lựa chọn "liên kết hồ sơ cũ" khi tạo hồ sơ mới là lỗi luồng; NHS App hiển thị rõ nguồn dữ liệu nào đã nối.
  - Người nhà thường xem kết quả thay ở VN: cần luồng ủy quyền có ghi nhận đồng ý (phù hợp Nghị định 13/2023), thay vì dùng chung tài khoản/OTP.
- **Không nên chép nguyên:** hệ thống hồ sơ GP quốc gia của Anh; ở VN dữ liệu nằm rải rác theo bệnh viện, và bệnh viện công thường bác sĩ trực tiếp đọc kết quả cho bệnh nhân.

## 3. AI soạn nháp giải thích kết quả, bác sĩ duyệt trước khi gửi (Stanford)

- **Nơi áp dụng:** Stanford Health Care (Mỹ), thử nghiệm cải tiến chất lượng.
- **Làm gì:** LLM soạn lời giải thích cho kết quả xét nghiệm/hình ảnh/bệnh lý; bác sĩ sửa và gửi. Không gửi thẳng cho bệnh nhân.
- **Bằng chứng:** Shah 2025 (Claude 3.5 Sonnet, 01–03/2025): 82,8% bác sĩ trả lời khảo sát dự định dùng lâu dài; 53,8% cho rằng đủ sẵn sàng triển khai rộng. Rào cản chính là độ chính xác và đầy đủ: 13/16 bình luận về nội dung là tiêu cực, có ý kiến "một số xét nghiệm không được đề cập hoặc nói sai". Nghiên cứu trước đó (Garcia 2024, GPT-4, trả lời tin nhắn bệnh nhân, 162 bác sĩ): tỷ lệ dùng bản nháp 20%, không giảm thời gian đo được, nhưng tải nhận thức tự báo cáo giảm; bản nháp bị chê dài dòng, máy móc; loại trừ tin nhắn tiếng không phải Anh, có đính kèm hoặc từ người đại diện. Cả hai là mẫu nhỏ, một cơ sở, khảo sát tự báo cáo, không đo an toàn bệnh nhân chính thức.
- **Bài học cho Vinmec/VN:**
  - Chatbot hiện tại đưa đường dẫn sai; mô hình "nháp + người duyệt" và giới hạn câu trả lời vào dữ liệu thật của tài khoản là rào chắn tối thiểu.
  - Chatbot nên biết trạng thái liên kết hồ sơ của người dùng trước khi chỉ đường.
  - Người dùng VN thường hỏi người nhà/bác sĩ: nút "hỏi lại bác sĩ" quan trọng hơn lời giải thích dài.
- **Không nên chép nguyên:** thử nghiệm đo ý kiến bác sĩ, chưa đo kết quả cho bệnh nhân; tiếng Việt chưa được đánh giá; gửi dữ liệu kết quả cho dịch vụ AI bên ngoài cần cân nhắc Nghị định 13/2023.

## Tóm tắt

| # | Thực hành | Nỗi đau MyVinmec liên quan | Độ mạnh bằng chứng | Rủi ro khi chép |
|---|---|---|---|---|
| 1 | Phát hành kết quả ngay (Cures Act) | Muốn nhận sớm | Khảo sát lớn nhưng phản hồi thấp, lệch mẫu | Lo lắng khi bất thường; pháp lý VN |
| 2 | Mục kết quả rõ + luật phát hành + truy cập hộ (NHS App) | Không tìm ra; chatbot sai; người nhà | Chỉ tài liệu chính sách | Hạ tầng dữ liệu khác |
| 3 | AI nháp + bác sĩ duyệt (Stanford) | Chatbot chỉ sai; cần giải thích | Mẫu nhỏ, tự báo cáo | Sai nội dung; dữ liệu nhạy cảm |

## Nguồn

- Steitz et al., *Perspectives of Patients About Immediate Access to Test Results Through an Online Patient Portal*, JAMA Netw Open 2023;6(3):e233572 – https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2802672
- ONC, *New Study Shows Patients Prefer Immediate Access to Test Results and have Unmet Information Needs* – https://healthit.gov/blog/information-blocking/new-study-shows-patients-prefer-immediate-access-to-test-results-and-have-unmet-information-needs/
- NHS App help, *Viewing test results* – https://www.nhs.uk/nhs-app/help/health-records-in-the-nhs-app/test-results/
- NHS England, *Online access to new GP health record information* (v1.6, 11/2024) – https://www.england.nhs.uk/long-read/online-access-to-new-gp-health-record-information/
- NHS App help, *Using family and carer access* – https://www.nhs.uk/nhs-app/help/profile/family-and-carer-access/
- Shah et al., *Clinician Perspectives on AI-Generated Drafts of Patient Test Result Explanations*, JAMA Netw Open 2025;8(8):e2528794 – https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2837938
- Garcia et al., *Artificial Intelligence–Generated Draft Replies to Patient Inbox Messages*, JAMA Netw Open 2024;7(3):e243201 – https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2816494
- Nghị định 13/2023/NĐ-CP (Điều 2 khoản 4: tình trạng sức khỏe trong hồ sơ bệnh án là dữ liệu nhạy cảm) – https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Nghi-dinh-13-2023-ND-CP-bao-ve-du-lieu-ca-nhan-465185.aspx
