# WebNC - Website Thương mại điện tử

Website thương mại điện tử hiện đại được xây dựng bằng MERN stack (MongoDB, Express.js, React.js, Node.js).

## Tính năng

- Xác thực người dùng (đăng nhập, đăng ký, quản lý hồ sơ)
- Duyệt và tìm kiếm sản phẩm
- Chức năng giỏ hàng
- Quản lý đơn hàng
- Bảng điều khiển quản trị cho sản phẩm và người dùng
- Thiết kế responsive cho mọi thiết bị

## Công nghệ sử dụng

### Frontend
- React.js
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Xác thực JWT
- Bcrypt

## Bắt đầu

### Yêu cầu hệ thống
- Node.js (v14 trở lên)
- MongoDB
- npm hoặc yarn

### Cài đặt

1. Sao chép kho lưu trữ
```bash
git clone [repository-url]
```

2. Cài đặt các gói phụ thuộc cho cả client và server
```bash
# Cài đặt phụ thuộc cho server
cd server
npm install

# Cài đặt phụ thuộc cho client
cd ../client
npm install
```

3. Tạo file .env trong thư mục server với các biến sau:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Khởi động máy chủ phát triển
```bash
# Khởi động server
cd server
npm run dev

# Khởi động client
cd client
npm run dev
```

Ứng dụng sẽ có sẵn tại:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Cấu trúc dự án

```
├── client/                 # Ứng dụng React Frontend
│   ├── public/            # Tệp tĩnh
│   └── src/               # Mã nguồn React
│       ├── components/    # Các component tái sử dụng
│       ├── pages/         # Component trang
│       ├── context/       # React context
│       └── services/      # Dịch vụ API
│
└── server/                # Ứng dụng Node.js Backend
    ├── models/           # Mô hình MongoDB
    ├── routes/           # Route API
    ├── middleware/       # Middleware tùy chỉnh
    └── config/           # Tệp cấu hình
```

## Đóng góp

1. Fork kho lưu trữ
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/TinhNangMoi`)
3. Commit thay đổi của bạn (`git commit -m 'Thêm TinhNangMoi'`)
4. Push lên nhánh (`git push origin feature/TinhNangMoi`)
5. Mở Pull Request



