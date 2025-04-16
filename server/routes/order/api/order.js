const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../../middleware/auth');
const orderController = require('../../../controllers/orderController');

// User routes
router.post('/', isAuthenticated, orderController.createOrder);
router.get('/', isAuthenticated, orderController.getUserOrders);
router.get('/:id', isAuthenticated, orderController.getOrderById);

// Admin routes
router.get('/admin/all', isAuthenticated, isAdmin, orderController.getAllOrders);
router.put('/admin/:id/status', isAuthenticated, isAdmin, orderController.updateOrderStatus);
router.get('/admin/event/:eventId', isAuthenticated, isAdmin, orderController.getOrdersByEvent);
router.get('/admin/statistics', isAuthenticated, isAdmin, orderController.getOrderStatistics);

module.exports = router;