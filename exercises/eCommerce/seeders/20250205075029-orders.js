"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "orders",
      // Orders for User 1
      [
        {
          user_id: 1,
          total_price: 250.0,
          status: "pending",
        },
        {
          user_id: 1,
          total_price: 145.5,
          status: "shipped",
        },

        // Orders for User 2
        {
          user_id: 2,
          total_price: 150.5,
          status: "shipped",
        },
        {
          user_id: 2,
          total_price: 180.0,
          status: "pending",
        },

        // Orders for User 3
        {
          user_id: 3,
          total_price: 320.75,
          status: "delivered",
        },
        {
          user_id: 3,
          total_price: 200.0,
          status: "pending",
        },

        // Orders for User 4
        {
          user_id: 4,
          total_price: 90.0,
          status: "canceled",
        },

        // Orders for User 5
        {
          user_id: 5,
          total_price: 400.0,
          status: "pending",
        },
        {
          user_id: 5,
          total_price: 500.5,
          status: "delivered",
        },

        // Orders for User 6
        {
          user_id: 6,
          total_price: 210.0,
          status: "shipped",
        },
        {
          user_id: 6,
          total_price: 150.2,
          status: "pending",
        },

        // Orders for User 7
        {
          user_id: 7,
          total_price: 500.0,
          status: "delivered",
        },

        // Orders for User 8
        {
          user_id: 8,
          total_price: 120.45,
          status: "pending",
        },

        // Orders for User 9
        {
          user_id: 9,
          total_price: 330.2,
          status: "delivered",
        },
        {
          user_id: 9,
          total_price: 275.0,
          status: "pending",
        },

        // Orders for User 10
        {
          user_id: 10,
          total_price: 275.0,
          status: "canceled",
        },
        {
          user_id: 10,
          total_price: 190.4,
          status: "shipped",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
