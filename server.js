const express = require('express');

let app = express();

module.exports = { app };

let port = 4000;
process.env.port ? process.server : app.listen({
    host: process.env.host ? process.env.host : 'localhost',
    port
}, () => console.log(`listening to port ${port}`));

// normal static route for rest
app.use(express.static(__dirname + '/dist'));

module.exports = { app };