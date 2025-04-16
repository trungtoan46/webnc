// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Lấy token từ header Authorization
    
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);


        if (!verified.userId) {
            return res.status(400).json({ message: 'Invalid token: Missing user ID' });
          }
        req.user = {
            _id: verified.userId,
            isAdmin: verified.role === 'admin'
        }; // Đính kèm thông tin người dùng vào request

       

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};


const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
};

module.exports = {
    isAuthenticated,
    isAdmin
};