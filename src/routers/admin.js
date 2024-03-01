const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const mdw = require('../middleware/check')

const passport = require('passport')

router.get('/list/user', adminController.listUser);

//passport.authenticate('jwt', {session: false}) ,
//mdw.verifyToken,
module.exports = router;