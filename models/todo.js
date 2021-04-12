const mongoose = require("mongoose");
const { Schema } = mongoose;

const toDoSchema = new Schema({
  title: String,
  status: Boolean,
});

const Todo = mongoose.model("Todo", toDoSchema);

module.exports = Todo;
