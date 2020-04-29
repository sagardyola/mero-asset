const adminRoute = require('./../components/admin/admin.route');
const authRoute = require('./../components/auth/auth.route');
const userRoute = require('./../components/user/user.route');

const authenticate = require('./../middlewares/authenticate');
const authorize = require('./../middlewares/authorize');

module.exports = function () {
    const router = require('express').Router();
    // router.use('/admin', adminRoute);
    router.use('/auth', authRoute);
    // router.use('./user', authenticate, userRoute);

    return router;
}