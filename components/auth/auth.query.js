const UserModel = require('./../user/user.model');
const mapUser = require('./../user/helpers/user.map');

function create(data) {
    var newUser = new UserModel({});
    var newMappedUser = mapUser(newUser, data);
    return newMappedUser.save();
}

function details(query, condition) {
    // console.log(UserModel.schema.path('gend').enumValues);

    if (condition == "userName") {
        email = {
            email: query.userName
        };
    } else {
        email = {
            email: query.email
        }
    }
    return UserModel.findOne({
        $or: [{
                userName: query.userName
            },
            email
        ]
    })
}

module.exports = {
    create,
    details
}



// details
// create
// update
// delete