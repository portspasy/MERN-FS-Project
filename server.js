const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Todo = require("./models/todo");

//middleware
app.use(express.json());

dotenv.config();

//connect to DB
connectDB();


// app.use("/api/todos");

// Respond with Hello World! on the homepage:
app.get("/test", async (req, res) => {
  const todo = await Todo.find();

  res.json(todo);
});

// Respond to POST request on the root route (/), the application’s home page:
app.post("/todo", (req, res) => {
  console.log(req.body);

  // Create a Todo
  const todo = new Todo({
    title: req.body.title,
    status: req.body.status,
  });

  // Save Todo in the database
  todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
});

// Respond to a PUT request to the /user route:
app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

// Respond to a DELETE request to the /user route:
app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
