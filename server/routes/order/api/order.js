const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getOrdersByEvent,
  getOrderStatistics
} = require('../../../controller/orderController');

// User routes
router.post('/', isAuthenticated, createOrder);
router.get('/my-orders', isAuthenticated, getUserOrders);
router.get('/:id', isAuthenticated, getOrderById);

// Admin routes
router.get('/admin/all', isAuthenticated, isAdmin, getAllOrders);
router.put('/admin/:id/status', isAuthenticated, isAdmin, updateOrderStatus);
router.get('/admin/event/:eventId', isAuthenticated, isAdmin, getOrdersByEvent);
router.get('/admin/statistics', isAuthenticated, isAdmin, getOrderStatistics);

module.exports = router;