const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //Connection with the MONGODB
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: "ecommerce-db",
    });
    console.log(`Connected to DB: ${connection.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
