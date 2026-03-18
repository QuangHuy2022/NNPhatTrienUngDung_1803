
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('NNPTUD_18032026', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
