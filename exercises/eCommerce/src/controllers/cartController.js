const Products = require("../../models/products");
const Cart = require("../../models/cart");
const { wishlists } = require("../../models/wishlist");
const { addToCartSchema } = require("../utils/validators/cartValidators");

//Add item to cart
async function addToCart(req, res) {
  try {
    await addToCartSchema.validate(req.body, { abortEarly: false });

    const { product_id, quantity } = req.body;
    const user_id = req.user.id; // Retrieved from the token

    const product = await Products.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await Cart.findOne({
      where: { user_id, product_id },
    });

    // Check if enough stock is available
    if (quantity > product.stock) {
      return res.status(409).json({
        message: `Not enough stock for product ID ${product_id}`,
      });
    }
    console.log(product.stock);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Product quantity updated in the cart",
        cartItem: existingCartItem,
      });
    } else {
      const newCartItem = await Cart.create({
        user_id,
        product_id,
        quantity,
      });
      return res.status(201).json({
        message: "Product added to the cart",
        cartItem: newCartItem,
      });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      message: "Error adding product to cart",
      error: error.message,
    });
  }
}

//get items from cart
async function getCartItems(req, res) {
  try {
    const user_id = req.user.id;
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: {
        model: Products,
        attributes: ["name", "price"],
      },
    });
    if (cartItems.length === 0) {
      return res.status(404).json({ message: "Your cart is empty" });
    }
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({
      message: "Error fetching cart items",
      error: error.message,
    });
  }
}

//delete item from cart
async function deleteCartItem(req, res) {
  try {
    const user_id = req.user.id;
    const id = req.params.id;
    const cartItem = await Cart.findOne({
      where: { user_id, id },
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    await cartItem.destroy();
    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    return res.status(500).json({
      message: "Error deleting product from cart",
      error: error.message,
    });
  }
}

//add product to wishlist
async function addToWishlist(req, res) {
  try {
    const { product_id } = req.body;
    const user_id = req.user.id;
    const product = await Products.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingWishlistItem = await wishlists.findOne({
      where: { user_id, product_id },
    });

    if (existingWishlistItem) {
      return res.status(200).json({
        message: "Product already in wishlist",
        wishlistItem: existingWishlistItem,
      });
    } else {
      const newWishlistItem = await wishlists.create({
        user_id,
        product_id,
      });
      return res.status(201).json({
        message: "Product added to wishlist",
        wishlistItem: newWishlistItem,
      });
    }
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return res.status(500).json({
      message: "Error adding product to wishlist",
      error: error.message,
    });
  }
}

//get items from wishlist
async function getWishlistItems(req, res) {
  try {
    const user_id = req.user.id;
    const wishlistItems = await wishlists.findAll({
      where: { user_id },
      include: {
        model: Products,
        attributes: ["name", "price"],
      },
    });
    if (wishlistItems.length === 0) {
      return res.status(404).json({ message: "Your Wishlist is empty" });
    }
    return res.status(200).json({ wishlistItems });
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    return res.status(500).json({
      message: "Error fetching wishlist items",
      error: error.message,
    });
  }
}

//delete item from wishlist
async function deleteWishlistItem(req, res) {
  try {
    const user_id = req.user.id;
    const product_id = req.params.id;
    const wishlistItem = await wishlists.findOne({
      where: { user_id, product_id },
    });
    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }
    await wishlistItem.destroy();
    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error deleting product from wishlist:", error);
    return res.status(500).json({
      message: "Error deleting product from wishlist",
      error: error.message,
    });
  }
}
module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
  addToWishlist,
  getWishlistItems,
  deleteWishlistItem,
};
