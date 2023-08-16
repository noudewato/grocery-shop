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
  updateUserProfile,
  userProfile,
  AllUsers,
} from "../controllers/user.controller.js";
const userRouter = express.Router();
import { isAdmin, protect } from "../utils/authMiddleware.js";

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.put("/user-address", protect, createAddress);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.get("/get-user", protect, isAdmin, getAllUsers);
userRouter.get("/user-order", getAllUsersOrder);
userRouter.get("/:id", getSingleUser);
userRouter.get("/me/s", protect, userProfile);
userRouter.get("/all-users", protect, AllUsers);
userRouter.put("/:id", updateUser);
userRouter.put("/me/e", protect, updateUserProfile);
userRouter.delete("/:id", deleteUser);

export default userRouter;
