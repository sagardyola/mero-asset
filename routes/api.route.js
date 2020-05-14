const adminRoute = require('./../components/admin/admin.route');
const authRoute = require('./../components/auth/auth.route');
const userRoute = require('./../components/user/user.route');
const rentalRoute = require('./../components/rental/routes/rental.route');
const exploreRoute = require('./../components/rental/routes/explore.route');

const authenticate = require('./../middlewares/authenticate');
const authorize = require('./../middlewares/authorize');

module.exports = function () {
    const router = require('express').Router();
    // router.use('/admin', adminRoute);
    router.use('/auth', authRoute);
    router.use('/user', authenticate, userRoute);
    router.use('/rental', authenticate, rentalRoute);
    router.use('/explore', exploreRoute);

    return router;
}