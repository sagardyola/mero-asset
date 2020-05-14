const router = require('express').Router();
const rentalCtrl = require('./../controllers/rental.controller');
const upload = require('./../../../middlewares/uploader');

router.route('/')
    .get(rentalCtrl.listAll)

router.route('/create')
    .get(rentalCtrl.getCreate)
    .post(upload.single('img'), rentalCtrl.create)

router.route('/:id')
    .get(rentalCtrl.details)
    .put(upload.single('img'), rentalCtrl.update)
    .delete(rentalCtrl.remove)

module.exports = router;