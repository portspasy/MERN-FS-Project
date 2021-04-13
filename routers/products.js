const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// // Respond with Hello World! on the homepage:
router.get("/", async (req, res) => {
  const product = await Product.find();

  res.json(product);
});

// Respond to POST request on the root route (/), the application’s home page:
router.post("/", (req, res) => {
  console.log(req.body);

  // Create a Product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
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

module.exports = router;
