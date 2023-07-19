import mongoose from "mongoose";
const schema = mongoose.Schema;
const model = mongoose.model;

const addressSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const addressModel = model("Address", addressSchema);

export default addressModel;
