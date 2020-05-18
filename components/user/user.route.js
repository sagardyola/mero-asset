const router = require('express').Router();
const userCtrl = require('./user.controller');
const upload = require('./../../middlewares/uploader');

// router.route('/edit-profile')
//     .post(userCtrl.profile)



router.route('/edit-profile')
    .put(userCtrl.update)


router.route('/delete-profile')
    .delete(userCtrl.remove)

router.route('/:id')
    .get(userCtrl.details)

module.exports = router;