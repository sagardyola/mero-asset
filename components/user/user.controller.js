const userQuery = require('./user.query');

function profile(req, res, next) {
    userQuery
        .details(req.loggedInUser._id)
        .exec(function (err, user) {
            if (err) {
                return next(err)
            }
            if (user) {
                res.json(user);
            } else {
                return next({
                    msg: 'User not found'
                })
            }
        })
}

module.exports = {
    profile,
    // editProfile
}