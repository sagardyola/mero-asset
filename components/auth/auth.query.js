const UserModel = require('./../user/user.model');
const mapUser = require('./../user/helpers/user.map');

function create(data, cb) {
    var newUser = new UserModel({});
    var newMappedUser = mapUser(newUser, data);
    newMappedUser.save(function (err, done) {
        if (err) {
            cb(err);
        } else {
            cb(null, done);
        }
    })
}

function read(query) {
    return UserModel.findOne({
        $or: [{
            username: query.username
        }, {
            email: query.email
        }]
    })
}

module.exports = {
    create,
    read
}