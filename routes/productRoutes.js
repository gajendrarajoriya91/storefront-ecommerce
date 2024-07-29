const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", authMiddleware, ProductController.updateProductById);
router.delete("/:id", authMiddleware, ProductController.deleteProductById);

module.exports = router;
