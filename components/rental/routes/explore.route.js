const router = require('express').Router();
const explore = require('./../controllers/explore.controller');

router.route('/')
    .get(explore.searchByGet)
    .post(explore.searchByPost);

module.exports = router;