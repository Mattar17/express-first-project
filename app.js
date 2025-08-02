const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const courseRouter = require('./routers/courses.route');
const userRouter = require('./routers/users.route');

const app = express();

const url = process.env.DEFAULT_CONNECTION_STRING;
mongoose.connect(url)
    .then(() => {
        console.log("mongoose server started");
    })
    .catch(err => {
        console.log(`Error happened while mongoose connecting ${err}`);
        process.exit(1);
    })


app.use(express.json());
app.use(cors());
app.use('/api/courses/', courseRouter);
app.use('/api/users/', userRouter);

app.use((error, req, res, next) => {
    res.status(500).json({ "status": "FAIL", "Error": error.message });
});

app.use((req, res, next) => {
    return res.json('resource not found');
});

app.listen('5000', () => {
    console.log("Listening on Port 5000");
})