const rentalQuery = require('./rental.query');
const fs = require('fs');
const path = require('path');

function listAll(req, res, next) {
    rentalQuery
        .listAll(req.loggedInUser._id)
        .then(function (rentalList) {
            if (rentalList.length == 0) {
                return next({
                    msg: 'Not found'
                })
            }
            res.status(200).json(rentalList);
        })
        .catch(function (err) {
            return next({
                msg: 'Not found'
            })
        })
}

function details(req, res, next) {
    rentalQuery
        .details(req.params.id)
        .then(function (details) {
            if (!details) {
                return next({
                    msg: 'Not found'
                })
            }
            res.status(200).json(details);
        })
        .catch(function (err) {
            return next(err);
        })
}

function create(req, res, next) {
    if (req.fileErr) {
        return next({
            msg: 'Invalid file format'
        });
    }

    if (req.file) {
        req.body.image = req.file.filename;
    }

    req.body.user = req.loggedInUser._id;
    rentalQuery
        .create(req.body)
        .then(function (saved) {
            res.status(200).json(saved);
        })
        .catch(function (err) {
            return next(err);
        })
}

function update(req, res, next) {

    if (req.fileErr) {
        return next({
            msg: 'Invalid file format'
        });
    }

    if (req.file) {
        req.body.image = req.file.filename;
    }

    rentalQuery
        .details(req.params.id)
        .then(function (rental) {
            var oldImage = rental.image;
            rentalQuery
                .update(rental, req.body)
                .then(function (updated) {
                    if (req.file) {
                        fs.unlink(path.join(process.cwd(), 'public/images/' + oldImage), function (err, done) {
                            if (err) {
                                console.log('File removed err', err);
                            } else {
                                console.log('Removed');
                            }
                        })
                    }
                    res.status(200).json(updated);
                })
                .catch(function (err) {
                    return next(err);
                })

        })
        .catch(function (err) {
            return next(err);
        })
}

function remove(req, res, next) {
    rentalQuery
        .remove(req.params.id)
        .then(function (removed) {
            res.status(200).json(removed);
        })
        .catch(function (err) {
            return next(err);
        })
}

module.exports = {
    details,
    listAll,
    create,
    update,
    remove
}