
const { DataTypes } = require('sequelize');
const { sequelize } = require("../config");
const bcrypt = require("bcrypt");

//user model
const users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This username is already taken. Please use a different one.',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {  // Change Name to name here
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is already taken. Please use a different one.',
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,  // Placed correctly
      set(value) {
        this.setDataValue('role', value.toLowerCase()); // Corrected
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    hooks: {
      // Hash password before creating the user
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      // Hash password before updating (if changed)
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

module.exports = { users };
