// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header
    
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = auth;