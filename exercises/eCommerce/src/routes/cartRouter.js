const express = require("express");
const router = express.Router();
const Controller = require("../controllers/cartController");
const { verifyToken, isAdmin, isCustomer } = require("../middlewares/auth");

//cart routes
router.post("/cart", verifyToken, isCustomer, Controller.addToCart);
router.get("/cart", verifyToken, isCustomer, Controller.getCartItems);
router.delete("/cart/:id", verifyToken, isCustomer, Controller.deleteCartItem);

//wishlist routes
router.post("/wishlist", verifyToken, isCustomer, Controller.addToWishlist);
router.get("/wishlist", verifyToken, isCustomer, Controller.getWishlistItems);
router.delete(
  "/wishlist/:id",
  verifyToken,
  isCustomer,
  Controller.deleteWishlistItem
);

module.exports = router;
