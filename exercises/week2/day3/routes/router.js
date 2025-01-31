const express = require("express");
const router = express.Router();
const controller= require("../controller/userController")
const {userIdValidator, userProfileValidator} = require("../middlewares/IdValidator");
const {imageUploader, pdfUploader} = require("../middlewares/fileUploader");

router.get("/", controller.home);
router.post("/users_demo", controller.createUser);
router.get("/users_demo", controller.getUsers);
router.get("/users_demo/:userId",userIdValidator, controller.getUsersById);
router.patch("/users_demo/:userId",userIdValidator, controller.updateUser);
router.delete("/users_demo/:userId",userIdValidator, controller.deleteUser);


router.post("/users_profiles/:userId",userIdValidator, controller.createUserProfile);
router.patch("/users_profiles/:userId",userIdValidator, controller.updateUserProfile);
router.get("/users_profiles", controller.getUserprofiles);
router.get("/users_profiles/:id", userProfileValidator, controller.getUserProfileById);
router.delete("/users_profiles/:id", userProfileValidator, controller.deleteUserProfile);

router.post("/users_images/:userId",userIdValidator,imageUploader, controller.uploadImg);
router.get("/users_images/:userId",userIdValidator, controller.getImgById);
router.get("/users_images/", controller.getImgs);
router.delete("/users_images/:userId",userIdValidator, controller.deleteUserImage);

router.get("/users/:userId", userIdValidator, controller.getUsersDetails);

module.exports = router;