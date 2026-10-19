/**
 * Tạo Google Form ghi chép phỏng vấn người nhà về lần nhận kết quả khám gần nhất.
 * Câu hỏi lấy từ phieu-hoi-nguoi-nha.md. Người phỏng vấn đọc câu hỏi và gõ câu trả lời vào form.
 *
 * Cách chạy: script.google.com → Dự án mới → dán file này → chọn hàm taoFormPhongVan → Chạy.
 * Link form in ra trong Nhật ký thực thi.
 */
function taoFormPhongVan() {
  var form = FormApp.create('Phỏng vấn: lần nhận kết quả khám gần nhất');
  form.setDescription(
    'Người phỏng vấn đọc từng câu và ghi câu trả lời vào đây, mỗi người một lượt gửi.\n' +
    'Hỏi về lần gần nhất, ghi việc người đó đã làm, không ghi ý kiến chung chung.\n' +
    'KHÔNG ghi tên, nơi làm việc, bệnh, chẩn đoán hay nội dung kết quả khám.'
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);

  // Trang 1: xin phép
  form.addSectionHeaderItem()
    .setTitle('0. Xin phép')
    .setHelpText(
      'Đọc: "Con đang làm bài tập về chuyện đi khám và nhận kết quả. Con hỏi về lần đi khám gần nhất, ' +
      'khoảng 15 phút. Con không ghi tên, không hỏi bệnh gì hay kết quả ra sao, chỉ hỏi chuyện đi lại, ' +
      'chờ đợi, lấy kết quả thôi. Con ghi âm để chép lại cho đúng được không? Chép xong con xóa."'
    );
  form.addTextItem().setTitle('Mã người tham gia').setHelpText('P1, P2, P3…').setRequired(true);
  form.addDateItem().setTitle('Ngày phỏng vấn').setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Hình thức')
    .setChoiceValues(['Trực tiếp', 'Gọi điện', 'Gọi video'])
    .setRequired(true);
  var dongY = form.addMultipleChoiceItem().setTitle('Đồng ý tham gia?').setRequired(true);
  dongY.setChoices([
    dongY.createChoice('Có', FormApp.PageNavigationType.CONTINUE),
    dongY.createChoice('Không (dừng, gửi form)', FormApp.PageNavigationType.SUBMIT)
  ]);
  form.addMultipleChoiceItem().setTitle('Đồng ý ghi âm?').setChoiceValues(['Có', 'Không']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Đồng ý cho trích lời (không kèm tên)?').setChoiceValues(['Có', 'Không']).setRequired(true);

  // Trang 2: sàng lọc
  form.addPageBreakItem().setTitle('1. Sàng lọc');
  var lanGanNhat = form.addMultipleChoiceItem()
    .setTitle('Q1. Lần gần nhất đi khám có làm xét nghiệm, chụp chiếu là khi nào?')
    .setRequired(true);
  lanGanNhat.setChoices([
    lanGanNhat.createChoice('Dưới 1 tháng', FormApp.PageNavigationType.CONTINUE),
    lanGanNhat.createChoice('1–3 tháng', FormApp.PageNavigationType.CONTINUE),
    lanGanNhat.createChoice('3–6 tháng', FormApp.PageNavigationType.CONTINUE),
    lanGanNhat.createChoice('Hơn 6 tháng (cảm ơn, dừng, gửi form)', FormApp.PageNavigationType.SUBMIT)
  ]);
  form.addMultipleChoiceItem()
    .setTitle('Khám cho ai?')
    .setChoiceValues(['Bản thân', 'Người khác trong nhà', 'Cả hai'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Q2. Khám ở viện công hay tư? (không ghi tên viện)')
    .setChoiceValues(['Công', 'Tư', 'Cả hai', 'Không nhớ'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Nhóm tuổi người được hỏi')
    .setChoiceValues(['Dưới 25', '25–34', '35–44', '45–59', '60 trở lên']);
  form.addMultipleChoiceItem()
    .setTitle('Đã từng dùng app hay website để xem kết quả khám chưa?')
    .setChoiceValues(['Có', 'Chưa', 'Không rõ']);

  // Trang 3: kể lại
  form.addPageBreakItem()
    .setTitle('2. Kể lại lần gần nhất (5 phút)')
    .setHelpText('Đào thêm khi cần: "Rồi sao nữa?", "Lúc đó mình làm gì?", "Lần gần nhất thì sao?"');
  form.addParagraphTextItem()
    .setTitle('Q3. Kể lại lần đó từ lúc quyết định đi khám tới lúc xong hết việc.')
    .setHelpText('Ghi theo thứ tự thời gian, có mốc nếu được.');
  form.addParagraphTextItem().setTitle('Q4. Trong cả lần đó, đoạn nào mất công hoặc bực nhất?');
  form.addMultipleChoiceItem()
    .setTitle('Người đó có TỰ nhắc tới đoạn nhận kết quả không (trước khi mình hỏi)?')
    .setChoiceValues(['Có', 'Không']);

  // Trang 4: ba câu chính
  form.addPageBreakItem().setTitle('3. Ba câu chính (10 phút)');
  form.addParagraphTextItem()
    .setTitle('Q5. Khám xong thì kết quả đến tay bằng cách nào? Kể lại từ lúc khám xong tới lúc cầm được kết quả.')
    .setHelpText('Nếu có dùng điện thoại hay app: "Lúc mở ra xem thì làm những bước gì? Có chỗ nào phải nhờ người khác không?"');
  form.addCheckboxItem()
    .setTitle('Kênh nhận kết quả (đánh dấu theo lời kể)')
    .setChoiceValues(['Giấy tại viện', 'Bác sĩ đọc, giải thích trực tiếp', 'Tin nhắn SMS hoặc Zalo', 'App', 'Website hoặc email'])
    .showOtherOption(true);
  form.addTextItem().setTitle('Chờ bao lâu mới có kết quả? Chờ ở viện hay về nhà?');
  form.addParagraphTextItem()
    .setTitle('Q6. Cầm kết quả rồi thì làm gì tiếp theo? Có bác sĩ giải thích không? Sau đó có phải hỏi thêm ai không, hỏi bằng cách nào?');
  form.addCheckboxItem()
    .setTitle('Sau khi có kết quả, họ đã làm gì (đánh dấu theo lời kể)')
    .setChoiceValues([
      'Không làm gì thêm',
      'Bác sĩ giải thích ngay, đủ hiểu',
      'Hỏi người quen làm ngành y',
      'Tra mạng',
      'Gọi tổng đài hoặc gọi viện',
      'Quay lại viện hoặc đặt lịch khám để hỏi'
    ])
    .showOtherOption(true);
  form.addParagraphTextItem()
    .setTitle('Q7. Lần đó tốn thêm bao nhiêu thời gian hay tiền để lấy kết quả hoặc hỏi về kết quả? Có phải nghỉ làm, đi lại thêm không?')
    .setHelpText('Ghi số nếu người đó nói ra.');
  form.addParagraphTextItem()
    .setTitle('Q8. Trước lần đó, lần gần nhất nhận kết quả là khi nào? Lần đó có giống vậy không?');

  // Trang 5: kết thúc
  form.addPageBreakItem().setTitle('4. Kết thúc (1 phút)');
  form.addParagraphTextItem().setTitle('Q9. Về lần đi khám đó, còn chuyện gì chưa hỏi mà người đó thấy đáng kể?');
  form.addParagraphTextItem()
    .setTitle('Q10. Còn ai mới đi khám gần đây để hỏi thêm không?')
    .setHelpText('Ghi quan hệ (vd "cô ruột"), không ghi tên.');

  // Trang 6: người phỏng vấn tự ghi sau buổi
  form.addPageBreakItem()
    .setTitle('5. Người phỏng vấn ghi sau buổi')
    .setHelpText('Ghi trong vòng 30 phút sau buổi. Tách sự thật (trên) khỏi diễn giải (dưới).');
  form.addParagraphTextItem().setTitle('2–3 câu nguyên văn').setHelpText('Mỗi câu một dòng, trong ngoặc kép.');
  form.addParagraphTextItem().setTitle('Điều bất ngờ hoặc trái giả thuyết');
  form.addMultipleChoiceItem()
    .setTitle('Diễn giải: vướng chủ yếu ở đâu?')
    .setChoiceValues(['Lấy được kết quả (giả thuyết A)', 'Hiểu kết quả, biết bước tiếp (giả thuyết B)', 'Cả hai', 'Không vướng gì đáng kể', 'Chưa rõ']);
  form.addParagraphTextItem().setTitle('Chỗ mình đã dẫn dắt, hỏi chung chung hoặc bỏ lỡ; sửa gì cho buổi sau');

  Logger.log('Link điền form: ' + form.getPublishedUrl());
  Logger.log('Link chỉnh sửa: ' + form.getEditUrl());
}
