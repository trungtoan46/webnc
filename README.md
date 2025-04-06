# WebNC - Website Thương mại điện tử

Website thương mại điện tử đầy đủ được xây dựng bằng Node.js, Express, MongoDB và React.

## Tính năng

### Frontend
- Giao diện hiện đại và responsive sử dụng Tailwind CSS
- Xác thực người dùng (Đăng nhập/Đăng ký)
- Duyệt và tìm kiếm sản phẩm
- Chức năng giỏ hàng
- Đếm ngược flash sale
- Hệ thống mã giảm giá
- Danh mục sản phẩm
- Phần lợi ích khách hàng
- Slider hình ảnh
- Bảng điều khiển quản trị với thống kê và hiển thị dữ liệu

### Backend
- Kiến trúc API RESTful
- Xác thực JWT
- Cơ sở dữ liệu MongoDB
- Hỗ trợ tải lên tệp
- Quản lý phiên
- Xử lý lỗi
- Cấu hình CORS

## Công nghệ

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Icons
- React Slick Carousel

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Cors
- Express Session

## Cấu trúc dự án

```
webnc/
├── client/                 # Ứng dụng React Frontend
│   ├── public/            # Tệp tĩnh
│   └── src/
│       ├── components/    # Các component tái sử dụng
│       │   ├── admin/     # Component bảng điều khiển quản trị
│       ├── layouts/       # Component bố cục
│       ├── pages/         # Component trang
│       ├── services/      # Dịch vụ API
│       ├── utils/         # Hàm tiện ích
│       └── App.jsx        # Component App chính
│
└── server/                # Ứng dụng Node.js Backend
    ├── config/           # Tệp cấu hình
    ├── controllers/      # Bộ điều khiển route
    ├── middleware/       # Middleware tùy chỉnh
    ├── models/          # Mô hình cơ sở dữ liệu
    ├── routes/          # Route API
    ├── services/        # Logic nghiệp vụ
    ├── uploads/         # Tệp được tải lên
    └── index.js         # Điểm vào máy chủ
```

## Bảng điều khiển quản trị

Bảng điều khiển quản trị cung cấp giao diện toàn diện để quản lý nền tảng thương mại điện tử:

- Tổng quan bảng điều khiển với các chỉ số và thống kê quan trọng
- Quản lý sản phẩm
- Quản lý đơn hàng
- Quản lý khách hàng
- Quản lý danh mục
- Phân tích và báo cáo bán hàng
- Cài đặt và cấu hình

Tính năng bảng điều khiển quản trị:
- Biểu đồ tương tác để hiển thị dữ liệu
- Theo dõi giao dịch gần đây
- Theo dõi sản phẩm bán chạy
- Giao diện thân thiện với người dùng với thanh bên tối
- Thiết kế responsive cho tất cả các thiết bị

## Bắt đầu

### Yêu cầu hệ thống
- Node.js (v14 trở lên)
- MongoDB
- npm hoặc yarn

### Cài đặt

1. Sao chép kho lưu trữ
```bash
git clone https://github.com/trungtoan46/webnc.git
cd webnc
```

2. Cài đặt các gói phụ thuộc
```bash
# Cài đặt các gói phụ thuộc backend
cd server
npm install

# Cài đặt các gói phụ thuộc frontend
cd ../client
npm install
```

3. Tạo tệp .env trong thư mục server
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Khởi động máy chủ phát triển
```bash
# Khởi động máy chủ backend
cd server
npm run dev

# Khởi động máy chủ frontend
cd client
npm run dev
```

Ứng dụng sẽ có sẵn tại:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Bảng điều khiển quản trị: http://localhost:5173/admin (yêu cầu xác thực)

## Các điểm cuối API

### Xác thực
- POST /api/auth/register - Đăng ký người dùng mới
- POST /api/auth/login - Đăng nhập người dùng
- POST /api/auth/logout - Đăng xuất người dùng
- GET /api/auth/me - Lấy thông tin người dùng hiện tại

### Sản phẩm
- GET /api/products - Lấy tất cả sản phẩm
- GET /api/products/:id - Lấy sản phẩm theo ID
- POST /api/products - Tạo sản phẩm mới
- PUT /api/products/:id - Cập nhật sản phẩm
- DELETE /api/products/:id - Xóa sản phẩm

### Danh mục
- GET /api/categories - Lấy tất cả danh mục
- POST /api/categories - Tạo danh mục mới
- PUT /api/categories/:id - Cập nhật danh mục
- DELETE /api/categories/:id - Xóa danh mục

### Giỏ hàng
- GET /api/cart - Lấy giỏ hàng của người dùng
- POST /api/cart - Thêm mặt hàng vào giỏ hàng
- PUT /api/cart/:id - Cập nhật mặt hàng trong giỏ hàng
- DELETE /api/cart/:id - Xóa mặt hàng khỏi giỏ hàng

### Mã giảm giá
- GET /api/vouchers - Lấy tất cả mã giảm giá
- POST /api/vouchers - Tạo mã giảm giá mới
- PUT /api/vouchers/:id - Cập nhật mã giảm giá
- DELETE /api/vouchers/:id - Xóa mã giảm giá

### Quản trị
- GET /api/admin/stats - Lấy thống kê bảng điều khiển
- GET /api/admin/orders - Lấy dữ liệu đơn hàng
- GET /api/admin/products/top - Lấy sản phẩm bán chạy
- GET /api/admin/customers - Lấy dữ liệu khách hàng

## Đóng góp

1. Fork kho lưu trữ
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/TinhNangTuyetVoi`)
3. Commit thay đổi của bạn (`git commit -m 'Thêm TinhNangTuyetVoi'`)
4. Push lên nhánh (`git push origin feature/TinhNangTuyetVoi`)
5. Mở Pull Request

