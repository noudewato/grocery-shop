import dotenv from "dotenv"
dotenv.config()

export const originalUrlMiddleware = (req, res, next) => {
  const error = new Error(`Not Found - ${(req.originalUrl)}`);
  res.status(404);
  next(error);
};


export const statusCodeMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 404 : res.statusCode
    
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
    err
}