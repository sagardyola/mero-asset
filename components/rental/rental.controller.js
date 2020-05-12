const rentalQuery = require('./rental.query');
const fs = require('fs');
const path = require('path');

function listAll(req, res, next) {
    rentalQuery
        .listAll(req.loggedInUser._id)
        .then(function (rentalList) {
            if (rentalList.length == 0) {
                return next({
                    msg: 'Not ads posted yet'
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

function getCreate(req, res, next) {
    rentalQuery
        .getCreate()
        .then(function (done) {
            res.json(done);
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
            req.body.user = req.loggedInUser._id;
            rentalQuery
                .update(rental, req.body)
                .then(function (updated) {
                    if (req.file) {
                        removeFile(oldImage)
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
        .details(req.params.id)
        .then(function (details) {
            if (details.image) {
                removeFile(details.image)
            }
            rentalQuery
                .remove(details)
                .then(function (removed) {
                    res.status(200).json(removed);
                })
                .catch(function (err) {
                    return next(err);
                })
        })
        .catch(function (err) {
            return next(err);
        })
}

function removeFile(fileName) {
    return fs.unlink(path.join(process.cwd(), 'public/images/' + fileName), function (err, done) {
        if (err) {
            console.log('File removed err', err);
        } else {
            console.log('Removed');
        }
    })
}

module.exports = {
    details,
    listAll,
    getCreate,
    create,
    update,
    remove
}