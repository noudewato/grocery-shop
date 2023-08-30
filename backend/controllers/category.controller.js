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
     return res.status(200).json({ success: false,
        message: "category already exists",
      });
    }

    const newCategory = new Category({
      ...req.body,
      slug: slugify(name),
    });

    const category = await newCategory.save();

    res.status(200).json({success: true, category});
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

    const existingCategory = await Category.findOne({ name });

    //  if (existingCategory) {
    //    return res
    //      .status(200)
    //      .json({ success: false, message: "category already exists" });
    //  }

    const category = await Category.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );

    await category.save()

    res.status(200).json({ success: true, category });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while updating category",
    });
  }
};

export const getActiveProductsCategoryController = async (req, res) => {
   try {
     const categories = await Category.find({products:{$exists: true, $ne:[]}})
       .sort({ name: "asc" }).populate("products")
     res.status(200).json(categories);
   } catch (error) {
     console.log(error);
     res.status(500).json({
       success: false,
       error,
       msg: "Error while getting category list",
     });
   }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const category = await Category.find()
      .sort({ name: "asc" })
      .populate("user");
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
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json(category)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while deleting category",
    });
  }
};
