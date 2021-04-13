const express = require("express");
const router = express.Router();
const User = require("../models/user");

// // Respond with Hello World! on the homepage:
router.get("/", async (req, res) => {
  const user = await User.find();

  res.json(user);
});

// Respond to POST request on the root route (/), the application’s home page:
router.post("/", (req, res) => {
  console.log(req.body);

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  // Save User in the MongoDB database
  user
    .save(user)
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
