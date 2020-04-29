const mongoose = require('mongoose');
const config = require('./config/db.config');

mongoose.connect(config.conxnURL + config.dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.once('open', function () {
    console.log('DB connection OPEN');
});

mongoose.connection.on('error', function (err) {
    console.log('DB connection FAILED');
})