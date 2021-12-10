var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    //res.sendFile(process.cwd() + "//index.html");
    res.sendFile("C:\\Users\\pc\\OneDrive\\Tài liệu\\GitHub\\rank-up-challenge\\index.html")
});

users = [];
var room_id = 1;
var room_code = '123';
io.on('connection', function(socket) {
    var roomCodeIsCorrect = false;
    socket.on('checkRoomCode', function(roomcode) {

        if (roomcode == room_code) {
            roomCodeIsCorrect = true;
        } else {
            roomCodeIsCorrect = false;

        }
    })
    socket.on('setUsername', function(data) {
        if (roomCodeIsCorrect) {
            if (users.indexOf(data) > -1) {
                socket.emit('userExists', data + ' username is taken! Try some other username.');
            } else {
                users.push(data);
                socket.emit('userSet', { username: data });
                socket.join("room-" + room_id);
                io.sockets.in("room-" + room_id).emit('connectToRoom', data + " has joined room no." + room_id);
            }
        } else {
            socket.emit('WrongRoomCode', 'Room code is false ! Type again !');
        }

    })



});
http.listen(3000, function() {
    console.log('listening on localhost:3000');
});