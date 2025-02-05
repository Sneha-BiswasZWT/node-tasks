const express = require("express");
const router = express.Router();
const Controller = require("../controllers/productController");
const { imageUploader, pdfUploader } = require("../middlewares/fileUploader");
const { verifyToken, isAdmin, isCustomer } = require("../middlewares/auth");

//category routes
router.post("/categories", verifyToken, isAdmin, Controller.createCategory);
router.get("/categories", verifyToken, Controller.getCategories);

//product routes
router.post(
  "/products",
  verifyToken,
  isAdmin,
  imageUploader,
  Controller.addProduct
);
router.get("/products", verifyToken, Controller.getProducts);
router.get("/products/:id", verifyToken, Controller.getProductById);
router.patch(
  "/products/:id",
  verifyToken,
  isAdmin,
  imageUploader,
  Controller.updateProduct
);
router.delete("/products/:id", verifyToken, Controller.deleteProduct);

module.exports = router;
