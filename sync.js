
const sequelize = require('./utils/db');
const User = require('./schemas/users');
const Role = require('./schemas/roles');
const Product = require('./schemas/products');
const Category = require('./schemas/categories');

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});
