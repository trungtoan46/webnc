const express = require('express');
const router = express.Router();
const { Voucher } = require('../../../model');

// Get all vouchers
router.get('/', async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get voucher by code
router.get('/:code', async (req, res) => {
  try {
    const voucher = await Voucher.findOne({ code: req.params.code });
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    res.json(voucher);
  } catch (error) {
    console.error('Error fetching voucher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new voucher
router.post('/', async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    console.error('Error creating voucher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update voucher
router.put('/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    res.json(voucher);
  } catch (error) {
    console.error('Error updating voucher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete voucher
router.delete('/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    res.json({ message: 'Voucher deleted successfully' });
  } catch (error) {
    console.error('Error deleting voucher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 