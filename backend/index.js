const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes.js');


dotenv.config();

const app = express();
const dbURL = process.env.MONGODB_ATLAS;


mongoose.connect(dbURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once("open", () => {
    console.log("Database connected");
});



const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/post', routes);

const Port = 8000;

app.listen(Port, () => {
    console.log('Backend is up');
})