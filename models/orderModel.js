const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [0, "Price must be a positive number"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount must be a positive number"],
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: [
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "UPI",
        "Wallet",
        "Other",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
