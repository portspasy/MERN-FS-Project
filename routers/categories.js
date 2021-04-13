const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// // Respond with Hello World! on the homepage:
router.get("/", async (req, res) => {
  const category = await Category.find();

  res.json(category);
});

// Respond to POST request on the root route (/), the application’s home page:
router.post("/", (req, res) => {
  console.log(req.body);

  // Create a Category
  const category = new Category({
    name: req.body.name,
    email: req.body.email,
  });

  // Save Todo in the MongoDB database
  category
    .save(category)
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
