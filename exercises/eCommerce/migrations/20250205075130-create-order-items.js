"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders", // Reference the orders table
          key: "id",
        },
        onDelete: "CASCADE", // Delete order items if the associated order is deleted
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products", // Reference the products table
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL", // Delete order items if the associated product is deleted
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        onUpdate: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_items");
  },
};
