const {users} = require('../models/usersModel');
const { DataTypes } = require('sequelize');
const { sequelize } = require("../config");

//user_profiles model
const user_profiles = sequelize.define(
    'user_profiles',
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
        bio: {  // Change Name to name here
            type: DataTypes.TEXT,
            allowNull: true,
        },
        linkedInUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                msg: 'This linkedIn ID is already used by someone else. please enter another one.',
            },
            validate: {
                isUrl: {
                    msg: 'Please enter a valid linkedIn url.',
                },
            },
        },
        facebookUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                msg: 'This facebook ID is already used by someone else. please enter another one.',
            },
            validate: {
                isUrl: {
                    msg: 'Please enter a valid facebook url.',
                },
            },
        },
        instaUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                msg: 'This instagram ID is already used by someone else. please enter another one.',
            },
            validate: {
                isUrl: {
                    msg: 'Please enter a valid instagram url.',
                },
            },
        }
    },
    {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
    }
);

users.hasOne(user_profiles, { foreignKey: 'userId', onDelete: 'CASCADE' });
user_profiles.belongsTo(users, { foreignKey: 'userId' });
module.exports = { user_profiles };
