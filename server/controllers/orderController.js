const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const Event = require('../models/Event.model');
const User = require('../models/User.model');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
      const {user, products, shippingInfo, paymentMethod, eventId } = req.body;
    
    // Tính tổng tiền
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      totalAmount += product.price * item.quantity;
    }

    // Tạo đơn hàng
    const order = new Order({
      user,
      products,
      totalAmount,
      shippingInfo,
      paymentMethod,
      event: eventId
    });

    await order.save();

    // Cập nhật số lượng sản phẩm
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity }
      });
    }

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Lấy danh sách đơn hàng của user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.product')
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message 
    });
  }
};

// Lấy chi tiết đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product')
      .populate('event')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Đơn hàng không tồn tại'
      });
    }

    // Kiểm tra quyền truy cập
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền truy cập đơn hàng này'
      });
    }

    res.status(200).json({
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Admin: Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product')
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Admin: Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Admin: Lấy danh sách đơn hàng theo sự kiện
exports.getOrdersByEvent = async (req, res) => {
  try {
    const orders = await Order.find({ event: req.params.eventId })
      .populate('user', 'name email')
      .populate('products.product')
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Admin: Lấy thống kê đơn hàng
exports.getOrderStatistics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const ordersByEvent = await Order.aggregate([
      { $match: { event: { $exists: true, $ne: null } } },
      { $group: { _id: '$event', count: { $sum: 1 } } },
      { $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'eventDetails'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      statistics: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        ordersByStatus,
        ordersByEvent
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 