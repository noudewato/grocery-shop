import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto, { randomBytes } from "crypto";
const schema = mongoose.Schema;

var validateEmail = function (email) {
  var matchEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return matchEmail.test(email);
};

var validatePhoneNumber = function (phonenumber) {
  var matchPhoneNumber = /^[0-9]+$/;
  return matchPhoneNumber.test(phonenumber);
};

const userSchema = new schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email address is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Please enter a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phonenumber: {
    type: String,
    required: [true, "phonenumber is required"],
    trim: true,
    unique: true,
    validate: [validatePhoneNumber, "only number is required"],
    match: /^[0-9]+$/,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },

  image: {
    type: String,
    default: "avatar",
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};
const userModel = mongoose.model("User", userSchema);

export default userModel;
