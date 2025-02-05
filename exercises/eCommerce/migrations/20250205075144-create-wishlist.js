"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wishlists", {
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
        onDelete: "CASCADE", // Delete wishlist item if user is deleted
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products", // Reference the products table
          key: "id",
        },
        onDelete: "CASCADE", // Delete wishlist item if product is deleted
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("wishlists");
  },
};
