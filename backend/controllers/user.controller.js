import userModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  try {
    const {username, email, phonenumber, password} = req.body
    if (!username || !email || !phonenumber || !password) {
      return res.send("Please all field are required");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(200).send("User Already exists please login");
    }

    const user = new userModel(req.body);

    await user.save();

    if (user) {
      res.status(201);
      res.json({
        user: {
          _id: user._id,
          name: user.username,
          email: user.email,
          image: user.image,
          phonenumber: user.phonenumber,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Could not register user, Please try again",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Your request could not be processed. Please try again.",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res
        .status(200)
        .json({ success: false, msg: "email and password are required!" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "email is not register" });
    }

    if (user && !(await user.matchPassword(password))) {
      res.status(200).json({ success: false, msg: "invalid password" });
    }

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          phonenumber: user.phonenumber,
          image: user.image,
          password: user.password,
          isAdmin: user.isAdmin,
          address: user?.address,
          token: generateToken(user._id),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      eroor: error,
      msg: "Your request could not be processed. Please try again.",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find().populate('orders', '_id')
      .sort({ created: -1 })

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({
        success: false,
        msg: "users list not found",
        allUsers,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Your request could not be processed. Please try again.",
      error,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      res.status(200);
      res.json(user);
    } else
      res.status(400).json({
        success: true,
        msg: "failed, user not found",
        allUsers,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Your request could not be processed. Please try again.",
      error,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phonenumber, image, isAdmin } = req.body;

    const update = await userModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        phonenumber,
        image,
        isAdmin,
      },
      { new: true }
    );

    res.status(200);
    res.json({
      success: true,
      msg: "Good job, user updated successfully",
      update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      eroor: error,
      msg: "bad request",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    const update = await userModel.findByIdAndUpdate(
      id,
      {
        isAdmin,
      },
      { new: true }
    );

    res.status(200);
    res.json(update);
  } catch (error) {
    res.status(500).json({
      success: false,
      eroor: error,
      msg: "bad request",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (user) {
      res.status(200).json({
        success: true,
        msg: "Good job, user deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      msg: "Your request could not be processed. Please try again.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        msg: "Could not sent email, Please try again",
      });
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link below to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({
      success: true,
      msg: "Email sent",
    });
    // try {
    //  await sendEmail({
    //     to: user.email,
    //     subject: "Password Reset Request",
    //     text: message
    //   })

    //    res.status(200).json({
    //      success: true,
    //      msg: "Email sent",
    //    });
    // } catch (error) {
    //   user.resetPasswordToken = undefined
    //   user.resetPasswordExpire = undefined;

    //   await user.save()

    //    res.status(500).json({
    //      success: false,
    //      error: error,
    //      msg: "could not reset password. Please try again.",
    //    });
    // }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      msg: "Your request could not be processed. Please try again.",
    });
  }
};

export const createAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ msg: "error" });
    }

    const update = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        ...req.body,
      },
      { new: true }
    );

    res.status(200);
    res.json(update);
  } catch (error) {
    res.status(500).json({
      success: false,
      eroor: error,
      msg: "bad request",
    });
  }
};

export const getAllUsersOrder = async (req, res) => {
  try {
    const allUsers = await userModel
      .find({})
      .populate("orders")
      .sort({ username: "ascending" })
      .limit(12);

    if (allUsers) {
      res.status(200).json({
        success: true,
        msg: "Done, get all users successfully",
        allUsers,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "users list not found",
        allUsers,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Your request could not be processed. Please try again.",
      error,
    });
  }
};

export const resetPassword = async (req, res) => {};
