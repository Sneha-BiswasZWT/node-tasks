const express = require("express");
const router = express.Router();
const Controller = require("../controller/userController");
const {imageUploader, pdfUploader} = require("../middlewares/fileUploader");
const {userIdValidator, userProfileValidator} = require("../validators/IdValidator");

//for home
router.get("/", Controller.home);

//CRUD OPERATIONS FOR users TABLE
router.get("/users", Controller.getUsers);
router.get("/users/:userId",userIdValidator, Controller.getusersbyId);//join with user_images & user_profile
router.post("/users",pdfUploader, Controller.createusers);
router.patch("/users/:userId",pdfUploader,userIdValidator, Controller.updateUser);
router.delete("/users/:userId",userIdValidator, Controller.deleteUser);

//CRUD OPERATIONS FOR user_images TABLE
router.post("/upload-image/:userId", userIdValidator, imageUploader, Controller.uploadimg);
router.get("/user-images/:userId", userIdValidator, Controller.getimages);
router.delete("/user-images/:userId", userIdValidator, Controller.deleteUserimage);

//CRUD OPERATIONS FOR user_profiles TABLE
router.post("/user-profile/:userId", userIdValidator, Controller.createuserProfile);
router.get("/user-profile",   Controller.getUserprofiles);
router.get("/user-profile/:id",  userProfileValidator, Controller.getuserProfilebyId);
router.put("/user-profile/:id",  userProfileValidator, Controller.updateUserProfile);
router.delete("/user-profile/:id",  userProfileValidator, Controller.deleteUserProfile);

module.exports = router;