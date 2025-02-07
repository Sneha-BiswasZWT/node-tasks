const Products = require("../../models/products");
const { orders } = require("../../models/orders");
const { orderItems } = require("../../models/order_items");
const Cart = require("../../models/cart");
const { sequelize } = require("../../config");

// order a product
async function orderProduct(req, res) {
  const user_id = req.user.id; // Retrieved from the token

  try {
    // Retrieve cart items for the user
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Products, attributes: ["id", "price", "stock"] }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }
    //console.log(cartItems);

    let totalPrice = 0;

    const order_Items = cartItems.map((item) => {
      // Check if enough stock is available
      if (item.quantity > item.product.stock) {
        return res.status(409).json({
          message: `Not enough stock for product ID ${item.product_id}`,
        });
      }

      totalPrice += item.quantity * item.product.price;
      return {
        product_id: item?.product_id,
        quantity: item?.quantity,
        price: item.quantity * item.product.price,
      };
    });

    // Start transaction
    const transaction = await sequelize.transaction(); // verifies is all the data is correct before saving it to the database

    try {
      const order = await orders.create(
        { user_id, total_price: totalPrice, status: "pending" },
        { transaction }
      );

      // Prepare order items data
      const orderItemsData = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      await orderItems.bulkCreate(orderItemsData, { transaction });

      // Reduce stock for all products
      await Promise.all(
        cartItems.map((item) =>
          Products.update(
            { stock: item.product.stock - item.quantity },
            { where: { id: item.product_id }, transaction }
          )
        )
      );

      // Clear the user's cart
      await Cart.destroy({ where: { user_id }, transaction });

      // Commit transaction
      await transaction.commit();

      return res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error placing order:", error);
    return res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
}

//get order history with pagination & sorting
async function orderHistory(req, res) {
  const user_id = req.user.id;

  // Retrieve query parameters for pagination and sorting
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sort_by || "created_at";
  const order = req.query.order || "ASC"; //

  const offset = (page - 1) * limit;

  const allowedSortFields = ["total_price", "created_at", "status"];

  const validSortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : "created_at";

  try {
    // Count total orders
    const count = await orders.count({ where: { user_id } });

    const totalPages = Math.ceil(count / limit);

    // Pagination info
    const paginationInfo = {
      totalOrders: count,
      totalPages: totalPages,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    // Fetch the order history
    const orderHistory = await orders.findAll({
      where: { user_id },
      include: [
        {
          model: orderItems,
          include: [Products],
        },
      ],
      order: [
        [validSortField, order],
        ["created_at", "DESC"], //default
      ],
      limit,
      offset,
    });

    return res.status(200).json({ paginationInfo, orderHistory });
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res.status(500).json({
      message: "Error fetching order history",
      error: error.message,
    });
  }
}

//Get order details
async function orderDetails(req, res) {
  const orderId = req.params.id;

  try {
    const order = await orders.findOne({
      where: { id: orderId },
      include: [{ model: orderItems, include: [Products] }],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({
      message: "Error fetching order details",
      error: error.message,
    });
  }
}

//Update order status
async function updateOrderStatus(req, res) {
  const orderId = req.params.id;
  const { status } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const order = await orders.findOne({
      where: { id: orderId },
      transaction,
    });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: "Order not found" });
    }

    await orders.update({ status }, { where: { id: orderId }, transaction });

    await transaction.commit();

    return res.status(200).json({ message: "Order status updated" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating order status:", error);
    return res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
}
module.exports = {
  orderProduct,
  orderHistory,
  orderDetails,
  updateOrderStatus,
};
