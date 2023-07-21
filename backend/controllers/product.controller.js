import Product from "../models/product.model.js";
import category from "../models/category.model.js";
import fs from "fs";
import { type } from "os";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    // const { user,  name, description, price, image, category } = req.body;

    // switch (true) {
    //   case !user:
    //     return res.status(400).json({
    //       msg: "user is required",
    //     });
    //   case !name:
    //     return res.status(400).json({
    //       msg: "name is required",
    //     });
    //   case !description:
    //     return res.status(400).json({
    //       msg: "description is required",
    //     });
    //   case !price:
    //     return res.status(400).json({
    //       msg: "price is required",
    //     });

    //   case !category:
    //     return res.status(400).json({
    //       msg: "category is required",
    //     });

    //   case !image:
    //     return res.status(400).json({
    //       msg: "image is required and should be less than 1mb",
    //     });
    // }

    // const product = Product.create({
    //   user,
    //   name,
    //   description,
    //   price,
    //   image,
    //   category,
    //   slug: slugify(name),
    // });

    // if (user) {
    //   res.status(201).json({
    //     product: {
    //       userId: product.user,
    //       name: product.name,
    //       category: product.category,
    //       price: product.price,
    //       description: product.description,
    //       image: product.image,
    //   }});
    // }

    req.body.user = req.user.id;

    const { user, name, description, price, image, category } = req.body;

    switch (true) {
      case !user:
        return res.status(400).json({
          msg: "user is required",
        });
      case !name:
        return res.status(400).json({
          msg: "name is required",
        });
      case !description:
        return res.status(400).json({
          msg: "description is required",
        });
      case !price:
        return res.status(400).json({
          msg: "price is required",
        });

      case !category:
        return res.status(400).json({
          msg: "category is required",
        });

      case !image:
        return res.status(400).json({
          msg: "image is required and should be less than 1mb",
        });
    }

    const newProduct = new Product({ ...req.body, slug: slugify(name) });
    const product = await newProduct.save();

    if (product) {
      res.status(201).json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while creating new product",
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("user")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while getting product lists",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while getting single product",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    switch (true) {
      case !name:
        return res.status(400).json({
          msg: "name is required",
        });
      case !description:
        return res.status(400).json({
          msg: "description is required",
        });
      case !price:
        return res.status(400).json({
          msg: "price is required",
        });

      case !category:
        return res.status(400).json({
          msg: "category is required",
        });

      case image:
        return res.status(400).json({
          msg: "image is required and should be less than 1mb",
        });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while updating product",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      msg: "Good job, Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while updating product",
    });
  }
};

export const getProductPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while get product image",
    });
  }
};

export const productsCategory = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          category: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const productsCategory = await Product.find({ ...keyword }).populate(
      "category"
    );

    res.status(201).json(productsCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      msg: "Error while get product image",
    });
  }
};
