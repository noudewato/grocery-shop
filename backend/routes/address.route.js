import express from "express";
import { createAddressController, getAllAddress, updateAddressController } from "../controllers/address.controller.js"
import { protect } from "../utils/authMiddleware.js";

const addressRouter = express.Router()


addressRouter.post('/create-user-address', protect, createAddressController)
addressRouter.put("/update-user-address", protect, updateAddressController);
addressRouter.get("/", getAllAddress);

export default addressRouter