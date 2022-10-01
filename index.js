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

const basketball = io.of("/1");
const basketball = io.of("/2");
const basketball = io.of("/3");
const basketball = io.of("/4");
const basketball = io.of("/5");
const basketball = io.of("/6");
const basketball = io.of("/7");
const basketball = io.of("/8");
const basketball = io.of("/9");
const basketball = io.of("/10");
const basketball = io.of("/11");
const basketball = io.of("/12");
const basketball = io.of("/13");
const basketball = io.of("/14");
const basketball = io.of("/15");
const basketball = io.of("/16");
const basketball = io.of("/18");
const basketball = io.of("/19");
const basketball = io.of("/20");
const basketball = io.of("/21");