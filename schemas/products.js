
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

// Thiết lập mối quan hệ
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = Product;
