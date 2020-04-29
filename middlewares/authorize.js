module.exports = function (req, res, next) {
    if (req.loggedInUser.role === 1) {
        return next();
    } else {
        next({
            msg: 'You dont have permisssion'
        })
    }
}