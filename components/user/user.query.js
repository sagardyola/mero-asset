const UserModel = require('./user.model');
const mapUser = require('./helpers/user.map');

function details(condition) {
    return UserModel
        .findOne(condition)
}



module.exports = {
    details
}