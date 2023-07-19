import mongoose from "mongoose";
const schema = mongoose.Schema;
const model = mongoose.model;

const orderSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    paymentMethod: {
      type: String,
      required: true,
    },

    deliverAddress: {
      city: { type: String, required: true },
      location: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["pending", "approve"],
      default: "pending",
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    deliveryPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = model("Order", orderSchema);

export default orderModel;
