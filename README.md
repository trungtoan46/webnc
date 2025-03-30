# WebNC - E-commerce Website

A full-stack e-commerce website built with Node.js, Express, MongoDB, and React.

## Features

### Frontend
- Modern and responsive UI using Tailwind CSS
- User authentication (Login/Register)
- Product browsing and search
- Shopping cart functionality
- Flash sale countdown
- Coupon system
- Product categories
- Customer benefits section
- Image slider

### Backend
- RESTful API architecture
- JWT authentication
- MongoDB database
- File upload support
- Session management
- Error handling
- CORS configuration

## Tech Stack

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

## Project Structure

```
webnc/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── services/      # API services
│       ├── utils/         # Utility functions
│       └── App.jsx        # Main App component
│
└── server/                # Backend Node.js application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── services/        # Business logic
    ├── uploads/         # Uploaded files
    └── index.js         # Server entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/webnc.git
cd webnc
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create .env file in server directory
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create new product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

### Categories
- GET /api/categories - Get all categories
- POST /api/categories - Create new category
- PUT /api/categories/:id - Update category
- DELETE /api/categories/:id - Delete category

### Cart
- GET /api/cart - Get user's cart
- POST /api/cart - Add item to cart
- PUT /api/cart/:id - Update cart item
- DELETE /api/cart/:id - Remove item from cart

### Vouchers
- GET /api/vouchers - Get all vouchers
- POST /api/vouchers - Create new voucher
- PUT /api/vouchers/:id - Update voucher
- DELETE /api/vouchers/:id - Delete voucher

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 