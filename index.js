// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);

const http = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// التوجيه
app.use(express.static(path.join(__dirname, 'public')));

// غرفة الدردشة

const general = io.of("/1");
const general = io.of("/2");
const general = io.of("/3");
const general = io.of("/5");
const general = io.of("/4");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const general = io.of("/general");
const football = io.of("/football");
const basketball = io.of("/basketball");
var people = {};

var generalTotalUser = 0;
var footballTotalUser = 0;
var basketballTotalUser = 0;

general.on('connection', function (socket) {

    nickname = socket.handshake.query['nickname'];
    people[socket.id] = nickname;

    socket.on('join', function(msg){
        footballTotalUser =  1;
        console.log(nickname);
        console.log("channel user count:");
        socket.broadcast.emit('join');
        socket.emit('activeUser');
    });

    socket.on('disconnect', function(msg){
        generalTotalUser = generalTotalUser - 1;
        console.log( people[socket.id] + ": has left to general channel");
        console.log("channel user count:" + generalTotalUser);
        socket.broadcast.emit('left', {nickname:  people[socket.id], count: generalTotalUser});
    });

    socket.on('new_message', function(msg){
        console.log(msg.nickname + " has send message: " + msg.message);
        socket.broadcast.emit('new_message', {nickname: msg.nickname, message: msg.message});
    });
});

football.on('connection', function (socket) {

    nickname = socket.handshake.query['nickname'];
    people[socket.id] = nickname;

    socket.on('join', function(msg){
        footballTotalUser = footballTotalUser + 1;
        console.log(nickname + ": has joined to general channel");
        console.log("channel user count:" + footballTotalUser);
        socket.broadcast.emit('join', {nickname: nickname, count: footballTotalUser});
        socket.emit('activeUser', {count: footballTotalUser});
    });

    socket.on('disconnect', function(msg){
        footballTotalUser = footballTotalUser - 1;
        console.log( people[socket.id] + ": has left to general channel");
        console.log("channel user count:" + footballTotalUser);
        socket.broadcast.emit('left', {nickname:  people[socket.id], count: footballTotalUser});
    });

    socket.on('new_message', function(msg){
        console.log(msg.nickname + " has send message: " + msg.message);
        socket.broadcast.emit('new_message', {nickname: msg.nickname, message: msg.message});
    });
});

basketball.on('connection', function (socket) {

    nickname = socket.handshake.query['nickname'];
    people[socket.id] = nickname;

    socket.on('join', function(msg){
        basketballTotalUser = basketballTotalUser + 1;
        console.log(nickname + ": has joined to general channel");
        console.log("channel user count:" + basketballTotalUser);
        socket.broadcast.emit('join', {nickname: nickname, count: basketballTotalUser});
        socket.emit('activeUser', {count: basketballTotalUser});
    });

    socket.on('disconnect', function(msg){
        basketballTotalUser = basketballTotalUser - 1;
        console.log( people[socket.id] + ": has left to general channel");
        console.log("channel user count:" + basketballTotalUser);
        socket.broadcast.emit('left', {nickname:  people[socket.id], count: basketballTotalUser});
    });

    socket.on('new_message', function(msg){
        console.log(msg.nickname + " has send message: " + msg.message);
        socket.broadcast.emit('new_message', {nickname: msg.nickname, message: msg.message});
    });
});
