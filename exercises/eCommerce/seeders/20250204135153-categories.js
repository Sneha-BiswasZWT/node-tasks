"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
