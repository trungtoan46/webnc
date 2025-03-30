const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../../model');

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Request received:', req.body); // Log request data

    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ 
        message: 'Email, mật khẩu và tên tài khoản là bắt buộc',
        received: { email: !!email, password: !!password, username: !!username }
      });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email đã tồn tại' : 'Username đã tồn tại'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      username,
      password: hashedPassword
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    // Send more detailed error information
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message,
      details: error.code === 11000 ? 'Duplicate key error' : error.name
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        received: { email: !!email, password: !!password }
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message
    });
  }
});

module.exports = router; 