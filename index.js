var express = require("express"),
    app = express(),
    port = 5000,
    http = require('http'),
    server = http.createServer(app);

var io = require('socket.io');
var socket = io.listen(server);
var routes = require('./routes/index');

server.listen(port);

/* Express + Jade */
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var usernames = {};
var rooms = {};

/* Routing */

app.get("/", routes);
app.get("/:room", routes);
app.get("/make", routes);

/* Card specific stuff */
var roomName = require('./script/roomname.js');
var cards = require('./script/cards.js');
var packs = require('./script/packs.js');
console.log('Here\'s a random room name: ' + roomName.makeRoomName(10));
var aBooster = cards.makeBooster("BNG");

var people = new Array();
var rooms = new Array();

/* Socket */
socket.on("connection", function (client) {
    client.on("join", function (name) {
        people[client.id] = name;
        client.emit("update", "You have connected.");
        socket.sockets.emit("update", name + " has joined this room");
        socket.sockets.emit("update-people", people);
    });

    client.on("send", function (message) {
        socket.sockets.in(client.room).emit("chat", people[client.id], message);
    });

    client.on("disconnect", function () {
        socket.sockets.emit("update", people[client.id] + " has left the server.");
        delete people[client.id];
        socket.sockets.emit("update-people", people);
    });

    client.on('switchRoom', function (newroom) {
        if (client.room != "") client.leave(client.room);
        client.join(newroom);
        client.room = newroom;
        client.broadcast.to(newroom).emit("update", people[client.id] + ' has joined this room');
    });
});

/* All done! */
console.log("Listening on port " + port);