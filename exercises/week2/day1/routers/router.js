const express = require("express");
const router = express.Router();
const Controller = require("../controller/UserController");
const {fileUploader} = require("../middleware/fileUploader");
const idValidator = require("../validators/IdValidator");

router.get("/", Controller.home);
router.get("/users", Controller.getUsers);
router.get("/users/:id",idValidator, Controller.getusersbyId);
router.post("/users", Controller.createusers);
router.patch("/users/:id",idValidator, Controller.updateUser);
router.delete("/users/:id",idValidator, Controller.deleteUser);
router.post("/upload-image/:id", idValidator, fileUploader, Controller.uploadimg);


module.exports = router;