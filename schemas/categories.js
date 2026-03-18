
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { timestamps: false });

module.exports = Category;
