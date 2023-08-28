import path from "path"
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import { statusCodeMiddleware } from "./utils/middleware.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import uploadRouter from "./routes/upload.route.js";
import orderRouter from "./routes/order.route.js";
import filterRouter from "./routes/filter.route.js"
dotenv.config();
connectDB()
const Port = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
// app.use(originalUrlMiddleware)
// app.use(statusCodeMiddleware());
const corsOrigin = {
  origin: "http://localhost:3001", 
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 404 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// app.get((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404)
//   next(error)
// });




//api router
app.use("/api/auth", userRouter)
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/order", orderRouter);
app.use("/api/filter", filterRouter);
app.use("/api/auth", (req, res) => {
  res.send("Hello server is running on port 8080");
});

const folder = path.resolve();
const __dirname = path.resolve();

app.use("/upload-images", express.static(path.join(folder, "/upload-images")));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build/')))

  app.get('*', (req, res)=> res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get("/", (req, res) => {
    res.send("Hello server is running");
  });
}

app.listen(Port, console.log(`server successfully connected to port ${Port}`));
