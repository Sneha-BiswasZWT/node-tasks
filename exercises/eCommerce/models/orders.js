const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const { users } = require("./usersModel");

const orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
      defaultValue: "pending",
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

// Association with users table (a user can have many orders)
users.hasMany(orders, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
orders.belongsTo(users, { foreignKey: "user_id" });

module.exports = { orders };
