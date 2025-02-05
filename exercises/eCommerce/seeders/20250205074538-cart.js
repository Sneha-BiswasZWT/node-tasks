"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cart",
      [
        {
          user_id: 1,
          product_id: 2,
          quantity: 3,
        },
        {
          user_id: 5,
          product_id: 8,
          quantity: 1,
        },
        {
          user_id: 3,
          product_id: 15,
          quantity: 2,
        },
        {
          user_id: 6,
          product_id: 20,
          quantity: 4,
        },
        {
          user_id: 9,
          product_id: 3,
          quantity: 1,
        },
        {
          user_id: 4,
          product_id: 18,
          quantity: 2,
        },
        {
          user_id: 10,
          product_id: 7,
          quantity: 5,
        },
        {
          user_id: 2,
          product_id: 12,
          quantity: 3,
        },
        {
          user_id: 7,
          product_id: 14,
          quantity: 1,
        },
        {
          user_id: 8,
          product_id: 9,
          quantity: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cart", null, {});
  },
};
