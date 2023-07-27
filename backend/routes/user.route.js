import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  forgotPassword,
  updateUser,
  createAddress,
  getAllUsersOrder,
} from "../controllers/user.controller.js";
const userRouter = express.Router();
import { isAdmin, protect } from "../utils/authMiddleware.js";

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.put("/user-address", protect, createAddress);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.get("/get-user", getAllUsers);
userRouter.get("/user-order", getAllUsersOrder);
userRouter.get("/:id", getSingleUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
