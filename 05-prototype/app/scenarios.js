// Mock account states used to test the prototype. All data is fictional.
// Each scenario mirrors a situation found in the app trial or store reviews.
const SCREENS = [
  { id: "home", ten: "Trang chủ" },
  { id: "ket_qua", ten: "Kết quả của tôi" },
  { id: "ket_noi", ten: "Kết nối hồ sơ khám (nhập mã y tế)" },
  { id: "thong_bao", ten: "Thông báo (tab Kết quả tách riêng khỏi Ưu đãi)" },
  { id: "ho_so", ten: "Hồ sơ" },
  { id: "dat_lich", ten: "Đặt lịch hẹn" },
  { id: "tong_dai", ten: "Gọi tổng đài" },
];

const SCENARIOS = {
  chua_ket_noi: {
    ten: "1. Đã khám sáng nay, tài khoản chưa kết nối hồ sơ",
    ghi_chu: "Giống buổi dùng thử: app không có kết quả vì hồ sơ khám chưa gắn với tài khoản.",
    ho_so: { da_ket_noi: false, da_tung_kham: true, chon_nham_tao_moi: false, nguoi_than: [] },
    ket_qua: [],
  },
  chon_nham: {
    ten: "2. Lỡ bấm \"chưa từng khám, tạo hồ sơ mới\"",
    ghi_chu: "Ngõ cụt tìm thấy khi dùng thử: sau khi tạo hồ sơ mới, nút kết nối biến mất. Bản này giữ lại lối kết nối.",
    ho_so: { da_ket_noi: false, da_tung_kham: true, chon_nham_tao_moi: true, nguoi_than: [] },
    ket_qua: [],
  },
  dang_cho: {
    ten: "3. Đã kết nối, một phần kết quả còn chờ",
    ghi_chu: "Kết quả chụp đã có; xét nghiệm máu chờ bác sĩ duyệt; nước tiểu đang xử lý.",
    ho_so: { da_ket_noi: true, da_tung_kham: true, chon_nham_tao_moi: false, nguoi_than: [] },
    ket_qua: [
      { ten: "Chụp X-quang ngực", trang_thai: "da_co", du_kien: null, ngay: "hôm nay" },
      { ten: "Xét nghiệm máu", trang_thai: "cho_bac_si_duyet", du_kien: "khoảng 15:00 hôm nay", ngay: "hôm nay" },
      { ten: "Xét nghiệm nước tiểu", trang_thai: "dang_xu_ly", du_kien: "khoảng 16:30 hôm nay", ngay: "hôm nay" },
    ],
  },
  xem_ho: {
    ten: "4. Xem hộ kết quả của mẹ",
    ghi_chu: "Người nhà xem hộ qua hồ sơ người thân. Nhóm này chưa được phỏng vấn, cần kiểm.",
    ho_so: { da_ket_noi: true, da_tung_kham: true, chon_nham_tao_moi: false, nguoi_than: ["Mẹ"] },
    ket_qua: [
      { ten: "Mẹ · Siêu âm bụng", trang_thai: "da_co", du_kien: null, ngay: "hôm qua" },
      { ten: "Mẹ · Xét nghiệm máu", trang_thai: "cho_bac_si_duyet", du_kien: "chưa có giờ dự kiến", ngay: "hôm qua" },
    ],
  },
};

const NOTIFICATIONS = {
  ket_qua: [
    { text: "Kết quả Chụp X-quang ngực đã có. Bấm để xem.", di: "ket_qua" },
    { text: "Xét nghiệm máu: đã xong, đang chờ bác sĩ duyệt (dự kiến 15:00).", di: "ket_qua" },
  ],
  uu_dai: ["Ưu đãi gói khám tầm soát…", "Quà tặng 20/10…", "Gói khám đột quỵ…", "Gói xạ trị…", "Khám thai trọn gói…"],
};
