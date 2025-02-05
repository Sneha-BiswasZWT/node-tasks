const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const { users } = require("./usersModel");
const Products = require("./products");

const wishlists = sequelize.define(
  "wishlists",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // Reference the users table
        key: "id",
      },
      onDelete: "CASCADE", // Delete wishlist item if user is deleted
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products", // Reference the products table
        key: "id",
      },
      onDelete: "CASCADE", // Delete wishlist item if product is deleted
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

// Associations
users.hasMany(wishlists, { foreignKey: "user_id", onDelete: "CASCADE" });
wishlists.belongsTo(users, { foreignKey: "user_id" });

Products.hasMany(wishlists, { foreignKey: "product_id", onDelete: "CASCADE" });
wishlists.belongsTo(Products, { foreignKey: "product_id" });

module.exports = { wishlists };
