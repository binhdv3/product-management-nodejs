const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../../config/db/index');
const { getToken } = require('./AdminController');
const bcrypt = require('bcrypt-nodejs');
const { reset } = require('nodemon');
require('../../config/passport/index')(passport);


class LoginSignupController {

    //[GET] /loginsignup/login
    login(req, res) {
        res.render('login');
    }

    
    //[POST] /loginsignup/login
    async signin(req, res) {

        let user = await User.findOne({ email: req.body.email });

        if (!user) { //nếu không phải user
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else { //đúng user
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.sign({ user }, db.secret, { expiresIn: 6040000000 });

                    res.redirect('/admin/list/user')

                    // , {
                    //     // users: mongooseToObject(user)
                    // }
                    console.log('<-----------' + token + '------------->');
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            })
        }

        // try {
        //     let user = await User.findByCredentials(req.body.email, req.body.password);
        //     if(!user){
        //         return res.status(401).json({error: 'sai thong tin dang nhap'})
        //     }
        //     //dang nhap thanh cong
        //     const token = await user.generateAuthToken();   

        //     return res.status(200).json({user, token});
        // } catch (error) {
            
        // }
    }

    //[GET] /loginsignup/signup
    signup(req, res) {
        res.render('signup')
    }

    //[post] /loginsignup/signup
    listed(req, res, next) {
        if (req.body.repassword === req.body.password) {
            const user = new User(req.body);
            user.save()
                .then(() => res.redirect('/product/create'))
                .then(next)
        } else {
            res.send(req.body.repassword)
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

module.exports = new LoginSignupController;