import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import { dirname } from 'path';
import path from 'path'
import { fileURLToPath } from 'url';

const app = express(); 
const server = createServer(app); 
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, './public/')))

//return the guest page
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get('/game', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//return the host page
// app.get('/host', function(req, res) {
//     res.sendFile(__dirname + "/test.html");
//     //res.sendFile("C:\\Users\\pc\\OneDrive\\Tài liệu\\GitHub\\rank-up-challenge\\index.html");
// });

let users = [];
let room_id = 1;
let room_code = '123';

let questions = [{
        question: "How to tell if a programming language is turing complete?",
        imgSrc: "https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/6/5/5/509655_shutterstock_1506580442_769367.jpg",
        A: "Ask the professor",
        B: "Ask the professor",
        C: "Ask the professor",
        D: "Ask the professor",
        correctAnswer: "A"
    },
    {
        question: "Is CSS a programming language?",
        imgSrc: "",
        A: "Yes",
        B: "Yes, it is",
        C: "No, it isn't",
        D: "No",
        correctAnswer: "D"
    },

];

io.on('connection', function(socket) {
    let roomCodeIsCorrect = false;
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

    //----------Send list question---------------
    socket.emit('ListQuestion', questions);
    //-------------------------------------------


});
server.listen(3000, function() {
    console.log('listening on localhost:3000');
});