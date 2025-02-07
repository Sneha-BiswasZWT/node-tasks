const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");

// User model definition
const Categories = sequelize.define(
  "categories",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "This category already exists.",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "categories",
    underscored: true,
    timestamps: false,
  }
);

module.exports = Categories;
