const UserModel = require('./../user/user.model');
const mapUser = require('./../user/helpers/user.map');

function getRegister() {
    return new Promise(function (resolve, reject) {
        resolve({
            gender: UserModel.schema.path('gender').enumValues
        });
    })
}

function register(data) {
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
    getRegister,
    register,
    details
}



// details
// create
// update
// delete