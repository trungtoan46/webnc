<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const eventRoutes = require('./routes/event');
const uploadRouter = require('./routes/upload');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
=======
const uploadRouter = require('./routes/upload');

app.use('/api/upload', uploadRouter); 
>>>>>>> 3f9f6512593005bf41314b6fe23811e2b7fe22e0
