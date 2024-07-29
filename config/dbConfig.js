const mongoose = require("mongoose");
require("dotenv").config(); // Ensure you have environment variables loaded

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    if (!dbURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(dbURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
