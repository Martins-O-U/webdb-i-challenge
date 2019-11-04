const express = require('express');
const db = require('./data/dbConfig.js');
const accountRouter =require('./account-router');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter)


server.get('*', (req,res) =>{
    res.json("This is the default zone")
})

module.exports = server;