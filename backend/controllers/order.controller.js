import orderModel from "../models/order.model.js";

export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      deliverPrice,
      deliverAddress,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.lenght === 0) {
      res.status(400).json({ message: "No Order Items" });
    } else {
      const order = new orderModel({
        orderItems,
        user: req.user._id,
        paymentMethod,
        itemsPrice,
        deliverPrice,
        deliverAddress,
        taxPrice,
        totalPrice,
        isPaid: true,
      });

      const createdOrder = await order.save();

      res.status(201).json({
        success: true,
        message: "Order Created Successfully",
        createdOrder,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error while getting product lists",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error while getting product lists",
    });
  }
};

// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };
//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order Not found");
//   }
// });

// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();
//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order Not found");
//   }
// });

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
    const { status } = req.body;

    const update = await orderModel.findByIdAndUpdate(
      id,
      {
        status
      },
      { new: true }
    );

    res.status(200);
    res.json(update);
};

export const getMyOrders = async (req, res) => {
  const orders = await orderModel.find({ user: req.user._id });
  res.json(orders);
};

export const GetOrders = async (req, res) => {
  const orders = await orderModel
    .find()
    .populate("user")
    .sort({ createdAt: -1 });
  const count = orders.length;
  res.json({ count, orders });
};

// export default det = {
//   addOrderItems,
//   getOrderById,
//   updateOrderToPaid,
//   GetMyOrders,
//   GetOrders,
//   updateOrderToDelivered,
//   updateOrderStatus,
// };
