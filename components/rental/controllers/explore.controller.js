const rentalQuery = require('./../query/rental.query');

function searchByGet(req, res, next) {
    search(req.query)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function searchByPost(req, res, next) {
    search(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
}

function search(query) {
    return new Promise(function (resolve, reject) {
        rentalQuery
            .search(query)
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    })
}


module.exports = {
    searchByGet,
    searchByPost
}