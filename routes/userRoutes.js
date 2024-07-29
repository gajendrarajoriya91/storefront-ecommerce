const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

router.put("/:id", authMiddleware, UserController.updateUserById);
router.delete("/:id", authMiddleware, UserController.deleteUserById);

module.exports = router;
