import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()

const MONGO_URL = process.env.MONGO_URI;

const connectDB = () => {
  mongoose.connect(
      MONGO_URL
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Db Connected successfully");
  });
};


export default connectDB;
