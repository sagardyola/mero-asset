const express = require('express');
const morgan = require('morgan');

const app = express();
var path = require('path');

app.set('port', require('./config'));
var port = app.get('port');

require('./db');
const cors = require('cors');



const socket = require('socket.io');
//socket stuff
var users = [];
const io = socket(app.listen(9091));
io.on('connection', function (client) {
    console.log("Client connected to socket server");
    var id = client.id; //dont use mongo db id but use this id to show offline disconnect
    client.on('new-user', function (data) {
        users.push({
            id: id,
            name: data
        });
        client.emit('users', users);
        client.broadcast.emit('users', users);
    })

    client.on('new-msg', function (data) {
        client.broadcast.to(data.receiverId).emit('reply-msg', data); //aafu bahek aru connected client lai
        client.emit('reply-msg-own', data); //aafulai matra
    })

    client.on('disconnect', function () {
        users.forEach(function (item, i) {
            if (item.id === id) {
                users.splice(i, 1);
            }
        });
        client.emit('users', users);
        client.broadcast.emit('users', users);
    })
})

const apiRouter = require('./routes/api.route')();

// Third party middlewares
app.use(morgan('dev'));
// Load inbuilt middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cors());

app.use(express.static('public')); //internally view file ley access garnu paryo bhaney
app.use('/file', express.static(path.join(__dirname, 'public'))); //external client end point provided to view file
app.use('/api', apiRouter);

app.use(function (req, res, next) {
    console.log('Application level middleware');
    next({
        status: 404,
        msg: 'Not Found'
    });
});

app.use(function (err, req, res, next) {
    console.log('I am error handling middleware');
    res.status(err.status || 400).json({
        msg: 'from error handling middleware',
        err: err
    })
});

app.listen(port, function (err, done) {
    if (err) {
        console.log('Failed')
    } else {
        console.log('Listening at port', port.port);
    }
})