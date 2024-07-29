const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, PaymentController.addPaymentMethod);
router.get("/:userId", authMiddleware, PaymentController.getUserPaymentMethods);
router.put("/:id", authMiddleware, PaymentController.updatePaymentMethod);
router.delete("/:id", authMiddleware, PaymentController.deletePaymentMethod);

module.exports = router;
