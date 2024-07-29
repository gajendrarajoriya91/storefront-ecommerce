const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:userId", authMiddleware, CartController.getCartByUserId);
router.post("/:userId/items", authMiddleware, CartController.addItemToCart);
router.put(
  "/:userId/items/:itemId",
  authMiddleware,
  CartController.updateItemInCart
);
router.delete(
  "/:userId/items/:itemId",
  authMiddleware,
  CartController.removeItemFromCart
);
router.delete("/:userId", authMiddleware, CartController.clearCart);

module.exports = router;
