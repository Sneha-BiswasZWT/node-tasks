const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// User model definition
const categories = sequelize.define(
  "categories",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    name: {
      type: sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    updated_at: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

module.exports = { categories };
