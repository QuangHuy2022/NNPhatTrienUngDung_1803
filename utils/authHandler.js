let userController = require('../controllers/users');
let jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    CheckLogin: async function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Yêu cầu xác thực không hợp lệ. Vui lòng cung cấp token theo định dạng \'Bearer <token>\'.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const pubK = fs.readFileSync('publicKey.pem');
            const decoded = jwt.verify(token, pubK, { algorithms: ['RS256'] });

            const user = await userController.GetAnUserById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'Xác thực thất bại. Người dùng không tồn tại.' });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Xác thực thất bại. Token đã hết hạn.' });
            }
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Xác thực thất bại. Token không hợp lệ.' });
            }
            return next(error); // Chuyển các lỗi khác đến error handler chung
        }
    }
};