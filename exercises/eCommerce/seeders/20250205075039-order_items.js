"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "order_items",
      [
        {
          order_id: 1,
          product_id: 5,
          quantity: 2,
          price: 50.0,
        },
        {
          order_id: 1,
          product_id: 10,
          quantity: 1,
          price: 100.0,
        },

        // Order Items for Order 2 (User 1)
        {
          order_id: 2,
          product_id: 7,
          quantity: 1,
          price: 60.0,
        },
        {
          order_id: 2,
          product_id: 15,
          quantity: 2,
          price: 42.75,
        },

        // Order Items for Order 3 (User 2)
        {
          order_id: 3,
          product_id: 3,
          quantity: 1,
          price: 100.0,
        },
        {
          order_id: 3,
          product_id: 18,
          quantity: 1,
          price: 50.5,
        },

        // Order Items for Order 4 (User 2)
        {
          order_id: 4,
          product_id: 2,
          quantity: 1,
          price: 70.0,
        },
        {
          order_id: 4,
          product_id: 8,
          quantity: 2,
          price: 40.0,
        },

        // Order Items for Order 5 (User 3)
        {
          order_id: 5,
          product_id: 13,
          quantity: 1,
          price: 120.0,
        },
        {
          order_id: 5,
          product_id: 9,
          quantity: 1,
          price: 100.0,
        },

        // Order Items for Order 6 (User 3)
        {
          order_id: 6,
          product_id: 1,
          quantity: 3,
          price: 30.0,
        },
        {
          order_id: 6,
          product_id: 16,
          quantity: 1,
          price: 70.0,
        },

        // Order Items for Order 7 (User 4)
        {
          order_id: 7,
          product_id: 11,
          quantity: 2,
          price: 50.0,
        },
        {
          order_id: 7,
          product_id: 17,
          quantity: 1,
          price: 80.0,
        },

        // Order Items for Order 8 (User 5)
        {
          order_id: 8,
          product_id: 12,
          quantity: 1,
          price: 75.0,
        },
        {
          order_id: 8,
          product_id: 14,
          quantity: 2,
          price: 55.0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_items", null, {});
  },
};
