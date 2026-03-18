
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Category = require('./categories');

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
});

Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = Product;
