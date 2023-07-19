import express from "express";
import { GetOrders, addOrderItems } from "../controllers/order.controller.js";
import { protect } from "../utils/authMiddleware.js";
const orderRouter = express.Router()

orderRouter.post("/addOrderItems", protect, addOrderItems)
orderRouter.get("/get-order", GetOrders)

export default orderRouter