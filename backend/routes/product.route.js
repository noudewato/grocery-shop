import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductPhotoController,
  getSingleProductController,
  updateProductController,
} from "../controllers/product.controller.js";
import { protect, isAdmin } from "../utils/authMiddleware.js";

const productRouter = express.Router();

//create-new-product router
productRouter.post(
  "/create-product",
  protect,
  isAdmin,
  createProductController
);

//get products
productRouter.get("/get-products", getAllProductsController);

//single product
productRouter.get(
  "/single-product/:id",
  protect,
  isAdmin,
  getSingleProductController
);

//update product
productRouter.put(
  "/update-product/:id",
  protect,
  isAdmin,
  updateProductController
);

//delete product
productRouter.delete(
  "/delete-product/:id",
  protect,
  isAdmin,
  deleteProductController
);

//product image
productRouter.get("/photo-product/:id", getProductPhotoController);

export default productRouter;
