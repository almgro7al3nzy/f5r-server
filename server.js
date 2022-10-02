const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const server = require('http').createServer(app);
const Msg = require('./models/messages');
const PORT = process.env.PORT || 3300;
const io = require('socket.io')(PORT)
require('dotenv').config()
const mongoDB = process.env.MONGODB_URI //'mongodb+srv://WV:yeOrjqrs6vPEGufk@cluster0.zvuasbs.mongodb.net/WVChat?retryWrites=true&w=majority'

// server.listen(PORT, () => {
//     console.log('Server listening at port %d', PORT);
//   });

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to DB')
}).catch(err => console.log(err))

io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
    console.log('a user connected');
    // socket.emit('message', '---- Beginning of the Chat ----');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatmessage', data => {
        var dt = new Date(data[2]);
        const Message = new Msg({ name: data[0], message: data[1], time:dt });
        
        Message.save().then(() => {
            io.emit('message', data)
        })


    })
});