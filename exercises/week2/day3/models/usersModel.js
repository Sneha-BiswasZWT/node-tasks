
const { DataTypes } = require('sequelize');
const { sequelize } = require("../config");

//user model
const users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      validate: {
        notNull: {
          msg: 'Please enter your email',
        },
        isEmail: {
          msg: 'Please enter a valid email address.',
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [18],
          msg: 'Age must be at least 18 years old.',
        },
        max: {
          args: [115],
          msg: 'Age cannot be more than 115. Unless you are kryptonian',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,  // Placed correctly
      set(value) {
        this.setDataValue('role', value.toLowerCase()); // Corrected
      },
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: 'Invalid Role. Available roles are: "admin", "user".',
        },
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
  }
);

module.exports = { users };
