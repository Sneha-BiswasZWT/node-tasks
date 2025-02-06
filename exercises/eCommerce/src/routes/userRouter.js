const express = require("express");
const router = express.Router();
const Controller = require("../controllers/usersController");

const { verifyToken, isAdmin, isCustomer } = require("../middlewares/auth");

router.get("/users", verifyToken, isAdmin, Controller.getUsers);
router.get("/users/profile", verifyToken, Controller.getUserProfile);
router.put("/users/profile", verifyToken, Controller.updateUser);

module.exports = router;
