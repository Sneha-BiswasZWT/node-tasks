const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const { users } = require("./users");
const Products = require("./products");

const cart = sequelize.define(
  "cart", // Model name
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true, // Primary Key
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Reference the users table
        key: "id",
      },
      onDelete: "CASCADE", // Delete cart item if user is deleted
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products", // Reference the products table
        key: "id",
      },
      onDelete: "CASCADE", // Delete cart item if product is deleted
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // Default quantity is 1
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false, // Timestamp when the cart item is added
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true, // Enable automatic timestamps (created_at & updated_at)
  }
);

// Relationships
cart.belongsTo(users, {
  foreignKey: "user_id", // Foreign key to users table
  onDelete: "CASCADE",
});
cart.belongsTo(Products, {
  foreignKey: "product_id", // Foreign key to products table
  onDelete: "CASCADE",
});

module.exports = cart;
