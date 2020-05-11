const RentalModel = require('./rental.model');
const mapRental = require('./helpers/rental.map');

function listAll(query) {
    return RentalModel
        .find({
            user: query
        })
        .sort({
            _id: -1
        });
}

function details(query) {
    return RentalModel
        .findById(query);
}

function getCreate() {
    return new Promise(function (resolve, reject) {
        resolve({
            itemFor: RentalModel.schema.path('itemFor').enumValues,
            itemType: RentalModel.schema.path('itemType').enumValues,
            gender: RentalModel.schema.path('gender').enumValues,
            maritalStatus: RentalModel.schema.path('maritalStatus').enumValues,
            overnightGuests: RentalModel.schema.path('overnightGuests').enumValues,
            partyHabits: RentalModel.schema.path('partyHabits').enumValues,
            smoker: RentalModel.schema.path('smoker').enumValues
        });
    })
}

function create(data) {
    return new Promise(function (resolve, reject) {
        RentalModel
            .estimatedDocumentCount({}, function (err, count) {
                if (err) {
                    reject(err);
                }
                var newRental = new RentalModel({});
                data.code = "ITM" + (count + 1);
                var newMappedRental = mapRental(newRental, data);

                // setTimeout(function () {
                newMappedRental.save(function (err, saved) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(saved)
                    }
                });
                // }, 1000);



            })
    })
}

function update(rental, body) {
    return new Promise(function (resolve, reject) {
        var updatedMapRental = mapRental(rental, body);
        updatedMapRental
            .save(function (err, updated) {
                if (err) {
                    reject(err);
                } else {
                    resolve(updated);
                }
            });
    })
}

function remove(rentalId) {
    return RentalModel.deleteOne(rentalId);
}

module.exports = {
    listAll,
    details,
    getCreate,
    create,
    update,
    remove
}