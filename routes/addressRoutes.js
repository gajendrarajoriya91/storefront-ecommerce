const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/addressController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, AddressController.addAddress);
router.get("/:userId", authMiddleware, AddressController.getUserAddresses);
router.put("/:id", authMiddleware, AddressController.updateAddress);
router.delete("/:id", authMiddleware, AddressController.deleteAddress);

module.exports = router;
