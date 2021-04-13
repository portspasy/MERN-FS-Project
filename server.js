const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

// include CORS before other routes
app.use(cors());
app.options("*", cors());

// Routers
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");

dotenv.config();

//middleware
app.use(express.json());
app.use(morgan("dev"));

// Use Routers
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);

//connect to DB
connectDB();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
