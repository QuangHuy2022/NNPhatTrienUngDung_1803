
// Import sequelize connection
const sequelize = require('./utils/db');

// Import models
require('./schemas/users');
require('./schemas/roles');
require('./schemas/products');
require('./schemas/categories');

console.log('Tất cả models đã được import.');

// Đồng bộ hóa database
sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created successfully!');
        process.exit(0); // Thoát tiến trình sau khi hoàn tất
    })
    .catch(error => {
        console.error('Unable to sync database:', error);
        process.exit(1); // Thoát với mã lỗi
    });
