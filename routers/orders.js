const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// // Respond with Hello World! on the homepage:
router.get("/", async (req, res) => {
  const order = await Order.find();

  res.json(order);
});

// Respond to POST request on the root route (/), the application’s home page:
router.post("/", (req, res) => {
  console.log(req.body);

  // Create an Order
  const order = new Order({
    name: req.body.name,
    email: req.body.email,
  });

  // Save Order in the MongoDB database

  order
    .save(order)
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
