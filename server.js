const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

const User = require('./userModel.js');
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userpassport", { useNewUrlParser: true });

app.get('/users', (req, res) => {
    User.find({})
        .then(p => {
            res.json(p)
        })
        .catch(err => {
            res.json(err);
        })
})

app.listen(PORT, () => console.log(`App running on port ${PORT}!`))