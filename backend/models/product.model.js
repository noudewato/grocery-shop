import mongoose from "mongoose";
const schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    name: {
      type: String,
      required: [true, "please name field is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = model("Product", productSchema);

export default productModel;
