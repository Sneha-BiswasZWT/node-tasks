const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const { orders } = require("./orders");
const Products = require("./products");

const orderItems = sequelize.define(
  "order_items",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
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
    timestamps: false,
  }
);

// Associations
orders.hasMany(orderItems, { foreignKey: "order_id", onDelete: "CASCADE" });
orderItems.belongsTo(orders, { foreignKey: "order_id" });

Products.hasMany(orderItems, { foreignKey: "product_id", onDelete: "CASCADE" });
orderItems.belongsTo(Products, { foreignKey: "product_id" });

module.exports = { orderItems };
