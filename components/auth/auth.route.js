const router = require('express').Router();
const authCtrl = require('./auth.controller');
// const authenticate = require('./../../middlewares/authenticate');
const upload = require('./../../middlewares/uploader');

router.route('/login')
    .post(authCtrl.login)

router.route('/register')
    .get(authCtrl.getRegister)
    .post(authCtrl.register)

router.route('/forgot-password')
    .post(authCtrl.forgotPassword)

router.route('/reset-password/:token')
    .post(authCtrl.resetPassword)

// router.route('/:id')
//     .get()

module.exports = router;