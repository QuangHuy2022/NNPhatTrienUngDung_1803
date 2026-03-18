
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Role = require('./roles');

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    fullName: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    avatarUrl: {
        type: DataTypes.STRING,
        defaultValue: 'https://i.sstatic.net/l60Hf.png'
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    loginCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    lockTime: {
        type: DataTypes.DATE
    }
});

User.belongsTo(Role);
Role.hasMany(User);

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

module.exports = User;
