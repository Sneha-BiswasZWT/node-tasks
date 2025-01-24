const express = require("express");
const router = express.Router();
const Controller = require("../controller");



router.get("/users", Controller.getusers);
router.get("/users/:id",  Controller.getusersbyId);
router.post("/users", Controller.createusers);
router.patch("/users/:id",Controller.updateUser);
router.delete("/users/:id",Controller.deleteUser);

module.exports = router;