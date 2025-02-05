"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserting dummy data into the categories table
    await queryInterface.bulkInsert(
      "categories",
      [
        { name: "Tech Gadgets" },
        {
          name: "Outdoor Adventures",
        },
        {
          name: "Fashion Trends",
        },
        { name: "Home Decor" },
        {
          name: "Fitness & Health",
        },
        {
          name: "Foodie Delights",
        },
        { name: "Gaming Gear" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Reverting the data insertion (deleting all categories)
    await queryInterface.bulkDelete("categories", null, {});
  },
};
