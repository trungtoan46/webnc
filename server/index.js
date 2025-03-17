const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
var fs = require('fs');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json()); 
//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const session = require('express-session');

const connectDB = require('./database');
connectDB();  
const { Category, Product } = require('./model');
const { create } = require('domain');
const e = require('express');
const {getCategory, getBreedName} = require('./apiTheCat');
const { title } = require('process');
const {crop} =require('./img/crop')


const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Hoặc domain frontend của bạn
  credentials: true // QUAN TRỌNG: Cho phép gửi cookie
}));



// Session middleware should be defined before requiring routes
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 ngày
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Require routes after middleware is set up
const cartRouter = require('./routers/cart');
const adminRouter = require('./routers/admin');
const adminCategoryRouter = require('./routers/admin-categories');
const productsRouter = require('./routers/products');
const adminProducts = require('./routers/admin-product');
const apiRouter = require('./routers/api'); // New API router for React frontend

// API routes for React frontend
app.use('/api', apiRouter);

// Traditional routes for server-rendered pages
app.use('/products', productsRouter);
app.use('/api/categories', adminCategoryRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.use('/api/products', adminProducts);

app.get('/', (req, res) => {
  res.redirect('/products');
});

// For React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});