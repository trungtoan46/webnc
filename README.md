# WebNC - Full Stack Web Application

Dự án full-stack kết hợp React (frontend) và Express (backend).

## Cấu trúc dự án

```
WebNC/
├── client/             # Frontend React
│   ├── public/         # Static files
│   ├── src/            # React source code
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── hooks/      # Custom hooks
│   │   └── context/    # React context
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
├── server/             # Backend Express
│   ├── views/          # EJS templates
│   ├── routers/        # Express routes
│   ├── public/         # Static files
│   ├── index.js        # Server entry point
│   └── package.json    # Backend dependencies
└── package.json        # Root dependencies
```

## Cài đặt

1. Cài đặt dependencies cho cả dự án:

```bash
npm run install-all
```

Hoặc cài đặt từng phần riêng biệt:

```bash
# Root dependencies
npm install

# Client dependencies
cd client && npm install

# Server dependencies
cd server && npm install
```

## Chạy dự án

### Chạy cả frontend và backend cùng lúc:

```bash
npm run dev
```

### Chạy riêng từng phần:

```bash
# Chỉ chạy backend
npm run server

# Chỉ chạy frontend
npm run client
```

## API Endpoints

Backend API có sẵn tại `http://localhost:3000/api`.

Frontend sẽ proxy các request API đến backend thông qua cấu hình trong `vite.config.js`.

## Công nghệ sử dụng

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Express
- MongoDB
- EJS (cho server-side rendering)
- Mongoose 