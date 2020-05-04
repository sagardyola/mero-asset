const RentalModel = require('./rental.model');
const mapRental = require('./helpers/rental.map');

function listAll(query) {
    return RentalModel
        .find({
            user: query
        });
}

function details(query) {
    return RentalModel
        .findById(query);
}

function create(data) {
    var newRental = new RentalModel({});
    var newMappedRental = mapRental(newRental, data);
    return newMappedRental.save();
}

function update(rental, body) {
    return new Promise(function (resolve, reject) {
        var updatedMapRental = mapRental(rental, body);
        updatedMapRental.save(function (err, updated) {
            if (err) {
                reject(err);
            } else {
                resolve(updated);
            }
        });
    })


}

function remove(rentalId) {
    return RentalModel.findByIdAndRemove(rentalId);
}

module.exports = {
    listAll,
    details,
    create,
    update,
    remove
}