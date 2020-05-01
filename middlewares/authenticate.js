const jwt = require('jsonwebtoken');
const config = require('./../config');
const UserModel = require('./../components/user/user.model');

module.exports = function (req, res, next) {
    var token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token']
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization']
    }
    if (req.headers['token']) {
        token = req.headers['token']
    }

    if (req.query.token) {
        token = req.query.token;
    } // if no headers in front end, send token...send token in query

    if (token) {
        jwt
            .verify(token, config.jwtSecret, function (err, decoded) {
                if (err) {
                    return next(err);
                }
                // console.log('token verified', decoded);
                UserModel
                    .findById(decoded.id, function (err, user) {
                        if (err) {
                            return next(user);
                        }
                        if (user) {
                            req.loggedInUser = user;
                            return next();
                        } else {
                            next({
                                msg: 'User removed from system'
                            })
                        }
                    })
            })
    } else {
        next({
            msg: 'Token not provided'
        })
    }
}