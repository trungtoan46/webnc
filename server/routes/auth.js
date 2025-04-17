const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // Set session data
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    // Save session before sending response
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ message: 'Lỗi đăng nhập' });
      }

      // Send response with user data and session ID
      res.json({
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        },
        sessionID: req.sessionID
      });
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Check session status
router.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ 
      isAuthenticated: true, 
      user: req.session.user 
    });
  } else {
    res.json({ 
      isAuthenticated: false 
    });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi đăng xuất' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Đăng xuất thành công' });
  });
});

module.exports = router; 