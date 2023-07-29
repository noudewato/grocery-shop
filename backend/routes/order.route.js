import express from "express";
import { GetOrders, addOrderItems, getOrderById, updateOrderStatus } from "../controllers/order.controller.js";
import { isAdmin, protect } from "../utils/authMiddleware.js";
const orderRouter = express.Router()

orderRouter.post("/addOrderItems", protect, addOrderItems)
orderRouter.get("/get-order",protect, isAdmin, GetOrders)
orderRouter.get("/single-order/:id",protect, getOrderById);
orderRouter.put("/update-order/:id", protect, isAdmin, updateOrderStatus);

export default orderRouter