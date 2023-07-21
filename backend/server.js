import path from "path"
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
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
app.use(statusCodeMiddleware);

// app.get((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404)
//   next(error)
// });

app.get("/", (req, res) => {
   res.send('Hello server is running')
})


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
app.use("/upload-images", express.static(path.join(folder, "/upload-images")));

app.listen(Port, console.log(`server successfully connected to port ${Port}`));
