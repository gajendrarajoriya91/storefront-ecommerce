const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, OrderController.createOrder);
router.get("/", authMiddleware, OrderController.getAllOrders);
router.get("/:id", authMiddleware, OrderController.getOrderById);
router.put("/:id/status", authMiddleware, OrderController.updateOrderStatus);
router.delete("/:id", authMiddleware, OrderController.deleteOrderById);

module.exports = router;
