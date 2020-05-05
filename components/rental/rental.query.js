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

    return new Promise(function (resolve, reject) {
        RentalModel
            .estimatedDocumentCount({}, function (err, count) {
                if (err) {
                    reject(err);
                }
                var newRental = new RentalModel({});
                data.code = "ITM" + (count + 1);
                var newMappedRental = mapRental(newRental, data);
                newMappedRental.save(function (err, saved) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(saved)
                    }
                });
            })
    })
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
    return RentalModel.deleteOne(rentalId);
}

module.exports = {
    listAll,
    details,
    create,
    update,
    remove
}