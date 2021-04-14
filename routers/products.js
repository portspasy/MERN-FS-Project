const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");

////////////////////////////////////////////////////////////////////
// [GET] List All Products :
////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(400).json({ success: false });
  }

  res.status(200).json(productList);
});

////////////////////////////////////////////////////////////////////
// [GET] Get A Specific Product by ID:
////////////////////////////////////////////////////////////////////
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({
      success: false,
      message: "The product with the given ID was not found!",
    });
  }

  res.status(200).json(product);
});

////////////////////////////////////////////////////////////////////
// [POST] Create New Product:
////////////////////////////////////////////////////////////////////
router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    res.status(400).json({
      success: false,
      message: "Invalid Category!",
    });
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  // Save Product in the MongoDB database
  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
});

////////////////////////////////////////////////////////////////////
// [PUT] Update The Data For A Specific Product ( by ID ):
////////////////////////////////////////////////////////////////////
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({
      success: false,
      message: "Invalid Product ID!",
    });
  }

  const category = await Category.findById(req.body.category);

  if (!category) {
    res.status(400).json({
      success: false,
      message: "Invalid Category!",
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    // for returning the new updated data
    { new: true }
  );

  if (!product) {
    res.status(400).json({
      success: false,
      message: "The product cannot be updated!",
    });
  }

  res.status(200).json(product);
});

////////////////////////////////////////////////////////////////////
// [DELETE] Remove A Specific Product ( by ID ):
////////////////////////////////////////////////////////////////////
router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: false,
          message: "The product is deleted!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Product not found!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).send({
        success: false,
        message: err,
      });
    });
});

module.exports = router;
