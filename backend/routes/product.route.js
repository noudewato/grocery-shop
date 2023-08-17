import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getCategoryController,
  getProductPhotoController,
  getSingleProductController,
  productsCategory,
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

productRouter.get("/get-product-category", productsCategory);

//single product
productRouter.get(
  "/single-product/:id",
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

productRouter.get(
  "/divers-category",
  getCategoryController
);

//product image
productRouter.get("/photo-product/:id", getProductPhotoController);

export default productRouter;
