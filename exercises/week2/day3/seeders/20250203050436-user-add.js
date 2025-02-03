'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        "username": "cleveland_44",
        "password": "Pass1234!",
        "name": "Cleveland",
        "email": "ckuhnhardt17@hexun.com",
        "role": "User",
        "age": 44,
        "is_active": true
      },
      {
        "username": "amanda_admin",
        "password": "SecurePass1!",
        "name": "Amanda",
        "email": "amanda32@mail.com",
        "role": "Admin",
        "age": 29,
        "is_active": false
      },
      {
        "username": "jamesw_88",
        "password": "JamesPass99!",
        "name": "James",
        "email": "jamesw88@outlook.com",
        "role": "User",
        "age": 35,
        "is_active": true
      },
      {
        "username": "sophia_k19",
        "password": "SophiaSecure12!",
        "name": "Sophia",
        "email": "sophiak19@gmail.com",
        "role": "Editor",
        "age": 27,
        "is_active": true
      },
      {
        "username": "michael92",
        "password": "Michael_!45",
        "name": "Michael",
        "email": "michael92@yahoo.com",
        "role": "User",
        "age": 41,
        "is_active": false
      },
      {
        "username": "william_h",
        "password": "WilliamPass99",
        "name": "William",
        "email": "william.hansen@mail.com",
        "role": "Admin",
        "age": 37,
        "is_active": true
      },
      {
        "username": "olivia_g",
        "password": "Olivia#Secure!",
        "name": "Olivia",
        "email": "olivia.green@company.com",
        "role": "User",
        "age": 31,
        "is_active": false
      },
      {
        "username": "ethan_t",
        "password": "EthanStrong55!",
        "name": "Ethan",
        "email": "ethan_taylor@mail.com",
        "role": "Editor",
        "age": 28,
        "is_active": true
      },
      {
        "username": "danielb_23",
        "password": "DanielSafe987!",
        "name": "Daniel",
        "email": "danielb23@protonmail.com",
        "role": "User",
        "age": 46,
        "is_active": true
      },
      {
        "username": "isabella_m",
        "password": "IsabellaPass!23",
        "name": "Isabella",
        "email": "isabella.martinez@mail.com",
        "role": "Admin",
        "age": 33,
        "is_active": false
      },
      {
        "username": "benjamin_76",
        "password": "BenjiPass!99",
        "name": "Benjamin",
        "email": "benji_76@webmail.com",
        "role": "User",
        "age": 50,
        "is_active": true
      },
      {
        "username": "emma_lane",
        "password": "Emma!Lane99",
        "name": "Emma",
        "email": "emma.lane@mail.com",
        "role": "Editor",
        "age": 29,
        "is_active": false
      },
      {
        "username": "logan_23",
        "password": "LoganSecure123!",
        "name": "Logan",
        "email": "logan_23@xyz.com",
        "role": "User",
        "age": 34,
        "is_active": true
      },
      {
        "username": "lucas_m",
        "password": "LucasStrong!55",
        "name": "Lucas",
        "email": "lucas_miller@hotmail.com",
        "role": "Admin",
        "age": 40,
        "is_active": false
      },
      {
        "username": "charlotte_b",
        "password": "Charlotte!999",
        "name": "Charlotte",
        "email": "charlotte.brown@mail.com",
        "role": "User",
        "age": 26,
        "is_active": true
      },
      {
        "username": "henry_t",
        "password": "HenryPass456!",
        "name": "Henry",
        "email": "henry_thomas@company.org",
        "role": "User",
        "age": 45,
        "is_active": true
      },
      {
        "username": "avery_j",
        "password": "Avery#Editor12",
        "name": "Avery",
        "email": "avery.jameson@gmail.com",
        "role": "Editor",
        "age": 30,
        "is_active": false
      },
      {
        "username": "elijah_w",
        "password": "Elijah#Secure88",
        "name": "Elijah",
        "email": "elijah_wood@oldmail.com",
        "role": "User",
        "age": 38,
        "is_active": true
      },
      {
        "username": "mia_d",
        "password": "Mia#Admin234",
        "name": "Mia",
        "email": "mia_davis@work.com",
        "role": "Admin",
        "age": 42,
        "is_active": false
      },
      {
        "username": "mason_r",
        "password": "Mason!User76",
        "name": "Mason",
        "email": "mason.ryan@mail.com",
        "role": "User",
        "age": 36,
        "is_active": true
      }
    ]
    
    , {});
  },
};
