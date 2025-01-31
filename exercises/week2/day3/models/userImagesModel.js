const { users } = require('../models/usersModel');
const { DataTypes } = require('sequelize');
const { sequelize } = require("../config");

//user_profiles model
const user_images = sequelize.define(
    'user_images',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: users,
                key: 'id',
            },
        },
        imageName: {  // Change Name to name here
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagePath: {  // Change Name to name here
            type: DataTypes.STRING,
            allowNull: false,
        },
        mimeType: {  // Change Name to name here
            type: DataTypes.STRING,
            allowNull: true,
        },
        extension: {  // Change Name to name here
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {  // Change Name to name here
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        createdAt: false,

    }
);

users.hasMany(user_images, { foreignKey: 'userId', onDelete: 'CASCADE' });
user_images.belongsTo(users, { foreignKey: 'userId' });
module.exports = { user_images };
