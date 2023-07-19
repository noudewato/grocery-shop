import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js"

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
          message: "Not Authorized, token failed",
        });
    }
    }
    
    if (!token) {
        res.status(400).json({
          message: "Not Authorized, No token found",
        });
    }
};


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({
          message: "Not authorized as an admin",
        });
        
    }
}