const http = require('http');
const app = require('./app');
/*const port = process.env.PORT || 3000;*/
const server = http.createServer(app);
server.listen(port); 

const express = require('express');
const app = express();
const mongodb = require('mongodb');

const config = require('./db');
const PORT = 3000;
const client = mongodb.MongoClient;

client.connect(config.DB, function(err, db) {
    if(err) {
        console.log('database is not connected')
    }
    else {
        console.log('connected!!')
    }
});

app.get('/', function(req, res) {
    res.json({"hello": "world"});
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
