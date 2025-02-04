"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        age: 28,
        role: "admin",
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        password: "password123",
        age: 22,
        role: "customer",
      },
      {
        first_name: "Michael",
        last_name: "Johnson",
        email: "michael.johnson@example.com",
        password: "password123",
        age: 35,
        role: "customer",
      },
      {
        first_name: "Emily",
        last_name: "Davis",
        email: "emily.davis@example.com",
        password: "password123",
        age: 30,
        role: "admin",
      },
      {
        first_name: "William",
        last_name: "Brown",
        email: "william.brown@example.com",
        password: "password123",
        age: 26,
        role: "customer",
      },
      {
        first_name: "Olivia",
        last_name: "Martinez",
        email: "olivia.martinez@example.com",
        password: "password123",
        age: 24,
        role: "customer",
      },
      {
        first_name: "Liam",
        last_name: "Garcia",
        email: "liam.garcia@example.com",
        password: "password123",
        age: 27,
        role: "admin",
      },
      {
        first_name: "Sophia",
        last_name: "Rodriguez",
        email: "sophia.rodriguez@example.com",
        password: "password123",
        age: 21,
        role: "customer",
      },
      {
        first_name: "James",
        last_name: "Lopez",
        email: "james.lopez@example.com",
        password: "password123",
        age: 31,
        role: "customer",
      },
      {
        first_name: "Isabella",
        last_name: "Hernandez",
        email: "isabella.hernandez@example.com",
        password: "password123",
        age: 29,
        role: "admin",
      },
    ];

    // **Hash passwords before inserting into the database**
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    return queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
