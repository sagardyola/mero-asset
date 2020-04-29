const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('./../../config');
const authQuery = require('./auth.query');
const sender = require('./../../config/nodemailer.config');

function login(req, res, next) {
    authQuery
        .read(req.body)
        .then(function (user) {
            var isMatch = passwordHash.verify(req.body.password, user.password);
            if (isMatch) {
                var token = jwt.sign({
                    id: user._id
                }, config.jwtSecret);
                res.status(200).json({
                    user: user,
                    token: token
                });
            } else {
                next({
                    msg: 'Invalid username or Password'
                });
            }
        })
        .catch(function (err) {
            return next({
                msg: 'Invalid UN or PASS'
            });
        })
}

function register(req, res, next) {
    req.body.password = passwordHash.generate(req.body.password);
    authQuery.create(req.body, function (err, saved) {
        if (err) {
            return next(err);
        }
        res.status(200).json(saved);
    })
}

function forgotPassword(req, res, next) {
    authQuery
        .read(req.body)
        .then(function (user) {
            if (!user) {
                return next({
                    msg: "User not registered"
                });
            }

            var mailData = {
                name: user.userName,
                email: user.email,
                link: req.headers.origin + '/auth/reset/' + user._id,
            }
            var email = prepareMail(mailData);
            user.passwordResetExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2); //2days 1000ms
            // user.password = null;

            user.save(function (err, done) {
                if (err) {
                    return next(err);
                }
                sender.sendMail(email, function (err, done) {
                    if (err) {
                        return next(err);
                    }
                    res.json(done);
                })
            });
        })
        .catch(function (err) {
            return next(err);
        })
}

function resetPassword(req, res, next) {
    var token = req.params.token;
    UserModel
        .findOne({
            _id: token,
            passwordResetExpiry: {
                $gte: Date.now()
            } //if greater accepts
        })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next({
                    msg: 'Password reset token is invalid or expired'
                })
            }
            user.password = passwordHash.generate(req.body.password);
            user.passwordResetExpiry = null;
            user.save(function (err, done) {
                if (err) {
                    return next(err);
                }
                res.json(done);
            })
        })
}

function prepareMail(data) {
    var mailBody = {
        from: 'Smart Web Store <noreply@abcd.com>', // sender address
        to: "sagardyola@gmail.com,dyolasagar@outlook.com" + "," + data.email, // list of receivers
        subject: "Subject Password ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>Hello <b>${data.name},</b></p>
        <p>We noticed u are having trouble logging into your system. Please cluck the link below to reset your password.</p>
        <p><a href="${data.link}">reset password</a></p>
        <p>If you have not requestd please ignore this email.</p>
        <p>Regards</p>
        <p>Smart Support Team</p>`
    }
    return mailBody;
}

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword
}