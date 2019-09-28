const express = require('express');
const bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const app = express();
const port = 5656;
const dbConfig = require('./config/db');

require('./app/routes/menuRoutes')(app);

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database");
}).catch(err => {
    console.log("Could not connect to database. Exiting now ...", err);
    process.exit();
})

app.get('/', (req, res) => {
    res.send("Api is on port 5656!");
})

app.listen(port, () => {
    console.log("We are live on " + `http://localhost:${port}`)
})