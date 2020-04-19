const express = require('express');

const postRouter = require('./data/postRouter.js');

const server = express();

server.use(express.json()); // need for POST and PUT
server.use('/api/posts', postRouter);

module.exports = server;