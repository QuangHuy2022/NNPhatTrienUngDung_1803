
const { Sequelize } = require('sequelize');

// Thay đổi các thông tin này cho phù hợp với cấu hình PostgreSQL của bạn
const sequelize = new Sequelize('NNPTUD_18032026', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
