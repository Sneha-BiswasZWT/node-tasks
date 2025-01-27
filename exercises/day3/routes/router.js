const express = require("express");
const router = express.Router();
const Controller = require("../controller");
const {fileUploader} = require("../middlewares/fileUploader");




router.get("/users", Controller.getUsersfilter);
router.get("/users/:id",  Controller.getusersbyId);
router.post("/users", Controller.createusers);
router.patch("/users/:id",Controller.updateUser);
router.delete("/users/:id",Controller.deleteUser);
router.post("/upload-image/:id", fileUploader, Controller.uploadimg);


module.exports = router;