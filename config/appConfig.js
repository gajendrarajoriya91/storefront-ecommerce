require("dotenv").config(); // Load environment variables from .env file

const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/yourdatabase",
  paymentAPIKey: process.env.PAYMENT_API_KEY || "your-payment-api-key",
};

module.exports = config;
