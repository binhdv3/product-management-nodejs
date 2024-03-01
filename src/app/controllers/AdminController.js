const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class AdminController {

    listUser(req, res, next) {

        const token = getToken(req.headers); //get token

        if (token) {
            User.find({})
                .then(users => res.render('admin/list-user', {
                    users: mutipleMongooseToObject(users)
                }))
                .catch(next)
        } else {
            return res.status(403).send({ success: false, msg: 'Unauthorized. hehe' });
        }


    }

    getToken = function (headers) {
        if (headers && headers.authorization) {
            const parted = headers.authorization.split(' ');
            if (parted.length == 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

module.exports = new AdminController;