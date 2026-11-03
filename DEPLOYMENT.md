# Deployment

Production: https://pham-quang-huy-portfolio.vercel.app

Vercel project: `huyit203s-projects/pham-quang-huy-portfolio` (tạo mới, không sửa project cũ).

Layout update: 02/11/2026, trạng thái **Ready**. Vercel chạy lệnh chuẩn `npm run build` (`tsc -b && vite build`).

Deployment: `pham-quang-huy-portfolio-84pwg0fle-huyit203s-projects.vercel.app`.

Đã kiểm tra HTTPS cho trang chủ, `/projects`, ba trang chi tiết dự án, `/about`, `/skills`, `/contact`, font và CV. Các URL riêng dùng Vercel SPA rewrite; trang không tồn tại được xử lý bằng giao diện 404 phía client.

13 kiểm tra chức năng trong DOM giả lập đã qua; chúng không xác minh hình ảnh của hiệu ứng. Kiểm tra trực quan trên trình duyệt chưa hoàn tất vì lớp an toàn Computer Use dừng thao tác khi không xác định chắc URL Chrome.

Website và CV đã kiểm tra qua HTTPS. CV được phục vụ trùng bản PDF mới nhất trong thư mục `outputs/cv`.

Trong môi trường hiện tại, CLI được cài riêng ở thư mục `work`, dữ liệu đăng nhập không nằm trong source hoặc các ZIP bàn giao. Sau khi đăng nhập Vercel từ terminal của bạn, có thể cập nhật website bằng CLI tại thư mục portfolio. Project link hiện tại được lưu ở `.vercel/project.json` trên máy này; thư mục đó không đưa vào ZIP source.

Skill dùng để triển khai: Vercel `deployments-cicd` và `vercel-cli`.
