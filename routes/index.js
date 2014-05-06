var express = require('express');
var router = express.Router();
var roomName = require('../script/roomname.js');

router.get('/make', function(req, res) {
    /* Generate a random room name */
    var room = roomName.makeRoomName(10);
    res.redirect('/' + room, { 'room': room });
});

router.get('/:room', function(req, res) {
    if (req.params.room.length != 10) res.redirect('/');
    res.render('room', { 'room': req.params.room });
});

router.get('/', function(req, res) {
    res.render('index', { title: 'Index'});
});

module.exports = router;