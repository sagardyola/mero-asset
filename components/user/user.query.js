const UserModel = require('./user.model');
const mapUser = require('./helpers/user.map');

function details(condition) {
    return UserModel
        .findOne(condition);
}

function update(user, body) {
    var updatedMapUser = mapUser(user, body);
    return updatedMapUser.save();
}

function remove(userId) {
    return UserModel.findByIdAndRemove(userId);
}



module.exports = {
    details,
    update,
    remove
}