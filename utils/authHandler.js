let userController = require('../controllers/users')
let jwt = require('jsonwebtoken')
const fs = require('fs');

module.exports = {
    CheckLogin: async function (req, res, next) {
        try {
            let token = req.headers.authorization;
            if (!token) {
                res.status(404).send({
                    message: "ban chua dang nhap"
                })
                return;
            }
            let pubK = fs.readFileSync('publicKey.pem');
            let result = jwt.verify(token, pubK, { algorithms: ['RS256'] });
            if (result.exp * 1000 < Date.now()) {
                res.status(404).send({
                    message: "ban chua dang nhap"
                })
                return;
            }
            let user = await userController.GetAnUserById(result.id);
            if (!user) {
                res.status(404).send({
                    message: "ban chua dang nhap"
                })
                return;
            }
            req.user = user;
            next()
        } catch (error) {
            res.status(404).send({
                message: "ban chua dang nhap"
            })
        }
    }
}