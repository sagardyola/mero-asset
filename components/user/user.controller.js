const userQuery = require('./user.query');

function details(req, res, next) {
    userQuery
        .details(req.params.id)
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

function update(req, res, next) {
    userQuery
        .update(req.loggedInUser, req.body)
        .then(function (updated) {
            res.json(updated);
        })
        .catch(function (err) {
            return next(err);
        })
}

function remove(req, res, next) {
    userQuery
        .remove(req.loggedInUser._id)
        .then(function (removed) {
            res.status(200).json(removed)
        })
        .catch(function (err) {
            next(err);
        })
}

module.exports = {
    details,
    update,
    remove
}