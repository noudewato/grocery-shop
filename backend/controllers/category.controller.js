import slugify from "slugify";
import categoryModel from "../models/category.model.js";

export const createCategoryController = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const { name, image, checked } = req.body;

    switch (true) {
      case !name:
        return res.status(400).json({
          message: "name is required",
        });
      case !image:
        return res.status(400).json({
          message: "image is required",
        });
      case !checked:
        return res.status(400).json({
          message: "active is required",
        });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      res.status(201).json({
        success: true,
        msg: "category already exists",
      });
    }

    const newCategory = new categoryModel({
      ...req.body,
      slug: slugify(name),
    });

    const category = await newCategory.save();

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error in category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    switch (true) {
      case !name:
        return res.status(400).json({
          message: "name is required",
        });
      case !image:
        return res.status(400).json({
          message: "image is required",
        });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );

    await updatedCategory.save()

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while updating category",
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({}).sort({ createdAt: -1 }).populate("user");
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while getting category list",
    });
  }
};

export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while getting single category",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      msg: "Good job, category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while deleting category",
    });
  }
};
