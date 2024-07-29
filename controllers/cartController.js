const { validationResult } = require("express-validator");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "items.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;
    const { userId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCart = await Cart.findOne({ user: userId });
    if (existingCart) {
      const itemIndex = existingCart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        existingCart.items[itemIndex].quantity += quantity;
        await existingCart.save();
        return res.status(200).json(existingCart);
      } else {
        existingCart.items.push({ product, quantity });
        await existingCart.save();
        return res.status(201).json(existingCart);
      }
    } else {
      const cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      await cart.save();
      return res.status(201).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateItemInCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
