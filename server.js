const express = require('express');
const cors = require('cors');

const postRouter = require('./data/postRouter.js');

const server = express();

server.use(express.json()); // need for POST and PUT
server.use(cors())
server.use('/api/posts', postRouter);

module.exports = server;