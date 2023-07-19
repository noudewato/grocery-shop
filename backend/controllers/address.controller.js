import addressModel from "../models/address.model.js";

export const createAddressController = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const { city, location } = req.body;

    switch (true) {
      case !city:
        return res.status(400).json({
          msg: "city is required",
        });
      case !location:
        return res.status(400).json({
          msg: "location is required",
        });
    }

    const newAddress = new addressModel({ ...req.body });
    const address = await newAddress.save();

    if (address) {
      res.status(201).json(address);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while creating address",
    });
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const { city, location } = req.body;

    switch (true) {
      case !city:
        return res.status(400).json({
          msg: "city is required",
        });
      case !location:
        return res.status(400).json({
          msg: "location is required",
        });
    }

    const updateAddress = await addressModel.findByIdAndUpdate(
      req.user.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updateAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while updating address",
    });
  }
};


export const getAllAddress = async (req, res) => {
    try {
        const allAddress = await addressModel.find().populate("user", "username")
        res.status(200).json(allAddress)
    } catch (error) {
        console.log(error);
    }
}
