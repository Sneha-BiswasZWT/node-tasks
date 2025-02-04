const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.home);
router.post("/register", authController.signUpUser);
router.post("/login", authController.loginUser);

module.exports = router;
