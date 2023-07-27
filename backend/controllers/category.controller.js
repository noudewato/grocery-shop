import slugify from "slugify";
import Category from "../models/category.model.js";

export const createCategoryController = async (req, res) => {
  try {
    req.body.user = req.user.id;
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

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      res.status(400).json({
        message: "category already exists",
      });
    }

    const newCategory = new Category({
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

    const updatedCategory = await Category.findByIdAndUpdate(
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
    const category = await Category.find().sort({ createdAt: -1 }).populate("user");
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
    const category = await Category.findById(req.params.id).populate("products");
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
    await Category.findByIdAndDelete(id);
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
