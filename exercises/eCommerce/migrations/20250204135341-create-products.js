"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.Date,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.Date,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
