const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

function filter(req, file, cb) {
    var mimeType = file.mimetype.split('/')[0];
    if (mimeType == 'image') {
        cb(null, true);
    } else {
        req.fileErr = true;
        cb(null, false);
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter: filter
});

module.exports = upload;