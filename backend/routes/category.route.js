import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  getActiveProductsCategoryController
} from "../controllers/category.controller.js";
import { isAdmin, protect } from "../utils/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create-category",
  protect,
  isAdmin,
  createCategoryController
);
categoryRouter.get("/get-category", getAllCategoryController);
categoryRouter.get("/active-products-category", getActiveProductsCategoryController);
categoryRouter.get("/single-category/:id", getSingleCategoryController);
categoryRouter.put(
  "/update-category/:id",
  protect,
  isAdmin,
  updateCategoryController
);
categoryRouter.delete(
  "/delete-category/:id",
  protect,
  isAdmin,
  deleteCategoryController
);

export default categoryRouter;
