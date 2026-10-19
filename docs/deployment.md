# Triển khai prototype

- Demo: https://vinmec.vinunquant.com/
- Slide HTML: https://vinmec.vinunquant.com/slides/
- Mã nguồn: https://github.com/loversky02/vinmec-exploration-sprint-baitap
- VPS: `103.249.200.42`; dùng Caddy hiện có và Cloudflare DNS/proxy.

Đây là bản mô phỏng độc lập, không phải dịch vụ chính thức của Vinmec. Giữ
nguyên giới hạn bằng chứng trong [README](../README.md): một phỏng vấn,
chưa thử với người dùng thật, chưa kiểm chế độ AI. Bản public chạy bằng luật
cố định với dữ liệu giả; không cấu hình API key. Không nhập thông tin thật.

## Cấu hình vận hành

[Service systemd](../deploy/vinmec-prototype.service) chạy bằng tài khoản riêng,
chỉ lắng nghe loopback. [Cấu hình Caddy](../deploy/vinmec.caddy) được import từ
`/etc/caddy/Caddyfile`, phục vụ HTTPS cho subdomain. Cấu hình tên miền chính
được giữ nguyên. Caddy tự quản lý chứng chỉ; tham khảo [lệnh validate và reload](https://caddyserver.com/docs/command-line).

Mã prototype trong `05-prototype/app`, `05-prototype/prompts` và
`05-prototype/server.py` được đưa lên dịch vụ web. Slide HTML và các ảnh bằng
chứng đã che thông tin nằm ở static root riêng cho `/slides/`. Log phỏng vấn không
được phục vụ trên subdomain. Log thử tải về nằm ở máy người thử;
`05-prototype/test-logs/`, ghi chép gốc, môi trường và kế hoạch nội bộ được Git
bỏ qua theo [.gitignore](../.gitignore).

## Cập nhật và kiểm tra

Đặt bản mới trong `/opt/vinmec-prototype/releases/<release>/05-prototype/`,
kiểm tra trước khi chuyển symlink `/opt/vinmec-prototype/current` sang release
mới, rồi chạy `systemctl restart vinmec-prototype`. Không đưa API key vào
service, Git hay dòng lệnh.

```sh
systemctl status vinmec-prototype --no-pager
curl --fail http://127.0.0.1:8770/api/mode
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
```

Sau cập nhật, kiểm tra HTTPS demo, bốn tình huống, trợ lý và trang chính.
`/api/mode` phải trả `{"ai":false,"model":null}` cho bản triển khai này.

## Cập nhật slide HTML

Nguồn là [slides/slides.html](../slides/slides.html), CSS, JavaScript, font và
ảnh trong cùng thư mục. Không cần Node.js hay bước biên dịch framework.
Đặt các tệp trong `/opt/vinmec-presentation/releases/<release>/`, đổi tên
`slides.html` thành `index.html` trong bản triển khai và trỏ symlink
`/opt/vinmec-presentation/current` tới release đó. Chỉ đưa các tài nguyên được
slide dùng vào static root này; không trỏ Caddy tới toàn bộ repository.

Kiểm tra `/slides/`, chuyển trang, liên kết ảnh và đường dẫn trực tiếp tới từng
slide sau cập nhật. Bản `slides.pdf` cũ được giữ trong Git làm tài liệu lưu trữ;
trang HTML là bản trình bày hiện hành. Có thể quay về bản slide trước bằng cách
đổi lại symlink riêng của presentation, không cần restart prototype.

## Khôi phục

Chuyển `current` về release trước rồi restart service. Với lần triển khai đầu,
có thể dừng riêng `vinmec-prototype`, bỏ dòng import dành riêng cho Vinmec,
validate rồi reload Caddy. Bản Caddyfile trước triển khai được giữ tại
`/etc/caddy/Caddyfile.before-vinmec-20261019`. Chỉ khôi phục cả tệp khi chắc
chắn không ghi đè thay đổi vận hành phát sinh sau đó.
