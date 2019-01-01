const express = require('express');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;

const app = express();

// db config
const dbConfig = require('./config/database');
// DB connection
mongoose.connect(dbConfig.url,{useCreateIndex: true,useNewUrlParser: true});
const db = mongoose.connection;
// On connection
mongoose.connection.on('connected', () => {
    console.log("Database connected successfully "+dbConfig.url);  
})
// On Error
mongoose.connection.on('error', (err) => {
    console.log("Database Error "+err);   
})

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/routes');

app.get('/',(req, res) => {
    res.send("Invalid route");
})

app.use('/api',routes);

app.listen(PORT, () => {
    console.log("Server Started On Port: ",PORT);
});