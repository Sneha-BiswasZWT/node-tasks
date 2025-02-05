const { users } = require("../../models/usersModel");
const Categories = require("../../models/categories");
const products = require("../../models/products");
const cart = require("../../models/cart");
const { orders } = require("../../models/orders");
const { orderItems } = require("../../models/order_items");
const { wishlists } = require("../../models/wishlist");

async function categoryIdValidator(req, res, next) {
  const { category_id } = req.body;

  console.log(category_id);
  try {
    const row = await Categories.findAll({
      where: {
        category_id: category_id,
      },
    });
    //console.log(row)
    if (row.length === 0) {
      return res.status(404).json({ message: "category ID not found" });
    }

    // ID exists, continue with the request
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error checking if ID exists" });
  }
}

async function userProfileValidator(req, res, next) {
  const userId = req.params.id;
  const parsedId = parseInt(userId, 10);
  //console.log(userId)

  // Check if the parsed ID is NaN (invalid number)
  if (isNaN(parsedId)) {
    return res
      .status(400)
      .json({ message: "Invalid ID format. It must be a number." });
  }
  //console.log(userId)
  try {
    const row = await user_profiles.findAll({
      where: {
        id: userId,
      },
    });
    //console.log(row)
    if (row.length === 0) {
      return res.status(404).json({ message: "User profile ID not found" });
    }

    // ID exists, continue with the request
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error checking if profile ID exists" });
  }
}

module.exports = { categoryIdValidator, userProfileValidator };
