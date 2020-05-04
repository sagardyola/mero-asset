const router = require('express').Router();
const userCtrl = require('./user.controller');
const upload = require('./../../middlewares/uploader');

// router.route('/edit-profile')
//     .post(userCtrl.profile)

router.route('/')
    .get(userCtrl.details)


router.route('/edit-profile')
    .put(userCtrl.update)


router.route('/delete-profile')
    .delete(userCtrl.remove)


module.exports = router;