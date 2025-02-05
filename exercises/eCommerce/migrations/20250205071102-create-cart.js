"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cart", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Reference the users table
          key: "id",
        },
        onDelete: "CASCADE", // If the user is deleted, delete cart items
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products", // Reference the products table
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "SET NULL", // If the product is deleted, delete cart items
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1, // Default quantity is 1
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
    await queryInterface.dropTable("carts");
  },
};
