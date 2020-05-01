const router = require('express').Router();
const userCtrl = require('./user.controller');
const upload = require('./../../middlewares/uploader');

// router.route('/edit-profile')
//     .post(userCtrl.profile)

router.route('/')
    .get(userCtrl.profile)



module.exports = router;