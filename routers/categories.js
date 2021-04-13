const express = require("express");
const router = express.Router();
const Category = require("../models/category");

////////////////////////////////////////////////////
// [GET] All Categories :
////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(400).json({ success: false });
  }

  res.status(200).json(categoryList);
});

////////////////////////////////////////////////////
// [GET] Single Category by ID:
////////////////////////////////////////////////////
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(500).json({
      success: false,
      message: "The category with the given ID was not found!",
    });
  }

  res.status(200).json(category);
});

////////////////////////////////////////////////////
// [POST] Create new Category:
////////////////////////////////////////////////////
router.post("/", (req, res) => {
  console.log(req.body);

  // Create a Category
  const category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
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

////////////////////////////////////////////////////
// [PUT] Update Single Category:
////////////////////////////////////////////////////
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
    },
    // for returning the new updated data
    { new: true }
  );

  if (!category) {
    res.status(400).json({
      success: false,
      message: "The category cannot be created!",
    });
  }

  res.status(200).json(category);
});

////////////////////////////////////////////////////
// [DELETE] Delete Category by ID:
////////////////////////////////////////////////////
router.delete("/:id", (req, res) => {
  console.log(req.body);

  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: false,
          message: "The category is deleted!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Category not found!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    });
});

module.exports = router;
