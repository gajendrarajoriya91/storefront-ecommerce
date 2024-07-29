const express = require("express");

const {
  notFoundMiddleware,
  errorMiddleware,
} = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
