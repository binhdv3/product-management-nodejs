const express = require('express');
const router = express.Router();
const loginsignupController = require('../app/controllers/LoginSignupController')
const mdw = require('../middleware/check')

// router.use(mdw.check_login)

const passport = require('passport')

router.get('/login', loginsignupController.login);
router.post('/login'  ,loginsignupController.signin);
router.get('/signup', loginsignupController.signup);
router.post('/signup', loginsignupController.listed);

//, passport.authenticate('jwt', {session: false})
module.exports = router;