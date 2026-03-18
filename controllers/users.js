const User = require('../schemas/users');

module.exports = {
    CreateAnUser: async function (username, password, email, roleId, fullName, avatarUrl, status, loginCount) {
        return await User.create({
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            avatarUrl: avatarUrl,
            status: status,
            roleId: roleId, // Make sure roleId is passed
            loginCount: loginCount
        });
    },
    GetAnUserByUsername: async function (username) {
        return await User.findOne({
            where: {
                isDeleted: false,
                username: username
            }
        });
    },
    GetAnUserById: async function (id) {
        return await User.findOne({
            where: {
                isDeleted: false,
                id: id
            }
        });
    }
};