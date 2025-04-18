const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
const authenticateAdmin = require('../../../middleware/authAdmin');

router.use(authenticateAdmin);

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({
          success: true,
          data: users
        });
    } catch (error) {
        res.status(500).json({ 
          success: false,
          message: 'Lỗi server', 
          error: error.message 
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json({
          success: true,
          data: user
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Lỗi server', 
          error: error.message 
        });
    }
}); 

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role, status } = req.body;  

        // Kiểm tra không cho phép admin hạ cấp chính mình
        if (id === req.user.userId && role && role !== 'admin') {
          return res.status(403).json({
            success: false,
            message: 'Bạn không thể hạ cấp tài khoản admin của chính mình'
          });
        }

        const user = await User.findByIdAndUpdate(id, { role, status }, { new: true });
        
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'Không tìm thấy người dùng'
          });
        }
        
        res.json({
          success: true,
          data: user,
          message: 'Cập nhật thông tin người dùng thành công'
        });
    } catch (error) {
        res.status(500).json({ 
          success: false,
          message: 'Lỗi server', 
          error: error.message 
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Ngăn không cho admin xóa tài khoản của chính mình
        if (id === req.user.userId) {
          return res.status(403).json({
            success: false,
            message: 'Bạn không thể xóa tài khoản của chính mình'
          });
        }
        
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'Không tìm thấy người dùng'
          });
        }
        
        res.json({ 
          success: true,
          message: 'Xóa người dùng thành công' 
        }); 
    } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Lỗi server', 
          error: error.message 
        });
    }
});

module.exports = router;
