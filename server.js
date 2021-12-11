import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';
import { dirname } from 'path';
import path from 'path'
import Character from './character.js'
import { fileURLToPath } from 'url';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, './public/')))

//return the guest login page
app.get('/guest', function(req, res) {
    res.sendFile(__dirname + "/guest.html");
});

app.get('/game', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//return the host page
app.get('/host', function(req, res) {
    res.sendFile(__dirname + "/host.html");
});


let users = [];
let room_id = 1;
let room_code;
var characters = [];

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
        imgSrc: "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg",
        A: "Yes",
        B: "Yes, it is",
        C: "No, it isn't",
        D: "No",
        correctAnswer: "D"
    },

];

io.on('connection', function(socket) {
    socket.on('create', function(data) {
        room_code = data.room_code;
        //hostname la users[0]
        users.push(data.name);
        socket.emit('created', "Created room");
        socket.emit('joined', true);


    });

    socket.on('setUsername', function(data) {
        if (data.room_code == room_code) {
            if (users.indexOf(data.name) > -1) {
                socket.emit('userExists', data.name + ' username is taken! Try some other username.');
            } else {
                users.push(data.name);
                socket.emit('userSet', { username: data.name });
                socket.join("room-" + room_id);
                socket.emit('joined', true);
                io.sockets.in("room-" + room_id).emit('connectToRoom', data.name + " has joined room");
                socket.emit('userExists', data.name + ' username is taken! Try some other username.');


                //-----------chon nhan vat----------------
                var name_character = "Mask Dude"; //string chua ten nhan vat
                name_character = data.character;



                var image = new Image();
                var canvas = document.getElementById('character');
                var context = canvas.getContext('2d');
                //image.src = './public/assets/Main Characters/' + name_character + '/Run (32x32).png';
                image.src = "http://127.0.0.1:8887/assets/Main%20Characters/Mask%20Dude/Run%20(32x32).png";
                image.crossOrigin = true;
                c.loadImage(image);
                //----tao nhan vat-------------
                var element = canvas.getBoundingClientRect();
                var c = new Character(element.x, element.y, canvas.width, canvas.height, data.name);
                characters.push(c);

                image.onload = function() {
                    context.drawImage(image,
                        image,
                        0,
                        0,
                        image.width,
                        image.height,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                }

            }
        } else {
            socket.emit('WrongRoomCode', 'Room code is false ! Type again !');
        }
    });



    //----------Send list question---------------
    socket.emit('ListQuestion', questions);
    //-------------------------------------------
});
server.listen(3000, function() {
    console.log('listening on localhost:3000');
});