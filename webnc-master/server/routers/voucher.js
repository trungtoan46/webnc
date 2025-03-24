const express = require('express');
const router = express.Router();
const { Voucher } = require('../model');

router.get('/', async (req, res) => {
    try {
        const vouchers = await Voucher.find({});
        res.json(vouchers);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách voucher", error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { code, discount } = req.body;
        const voucher = new Voucher({ code, discount });
        await voucher.save();
        res.status(201).json(voucher);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo voucher", error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { code, discount } = req.body;
        const voucher = await Voucher.findByIdAndUpdate(req.params.id, { code, discount }, { new: true });
        if (!voucher) {
            return res.status(404).json({ message: "Không tìm thấy voucher" });
        }
        res.json(voucher);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật voucher", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!voucher) {
            return res.status(404).json({ message: "Không tìm thấy voucher" });
        }
        res.json({ message: "Xóa voucher thành công" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa voucher", error: error.message });
    }
});








module.exports = router;
