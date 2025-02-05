"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wishlists",
      [
        {
          user_id: 1,
          product_id: 5,
        },
        {
          user_id: 1,
          product_id: 10,
        },

        // Wishlist items for User 2
        {
          user_id: 2,
          product_id: 8,
        },
        {
          user_id: 2,
          product_id: 12,
        },

        // Wishlist items for User 3
        {
          user_id: 3,
          product_id: 3,
        },
        {
          user_id: 3,
          product_id: 17,
        },

        // Wishlist items for User 4
        {
          user_id: 4,
          product_id: 6,
        },
        {
          user_id: 4,
          product_id: 11,
        },

        // Wishlist items for User 5
        {
          user_id: 5,
          product_id: 15,
        },
        {
          user_id: 5,
          product_id: 14,
        },

        // Wishlist items for User 6
        {
          user_id: 6,
          product_id: 2,
        },
        {
          user_id: 6,
          product_id: 9,
        },

        // Wishlist items for User 7
        {
          user_id: 7,
          product_id: 18,
        },
        {
          user_id: 7,
          product_id: 19,
        },

        // Wishlist items for User 8
        {
          user_id: 8,
          product_id: 4,
        },
        {
          user_id: 8,
          product_id: 13,
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wishlists", null, {});
  },
};
