const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// console.log(process.env);

connectDB();

// Respond with Hello World! on the homepage:
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Respond to POST request on the root route (/), the application’s home page:
app.post("/", function (req, res) {
  res.send("Got a POST request");
});

// Respond to a PUT request to the /user route:
app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

// Respond to a DELETE request to the /user route:
app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
