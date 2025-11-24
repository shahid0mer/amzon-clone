import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const order = await Order.create({
      user: userId,
      ...req.body
    });

    res.status(201).json({ success: true, order });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
    .populate('items.product')
    .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product", "title images price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ success: true, order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
