const express = require('express');
const router = express.Router();

const User = require('../models/user');

const mongoose = require('mongoose');
const db = 'mongodb://mike:mike@ds121349.mlab.com:21349/events-manager';

mongoose.connect(db, err => {
    if (err) {
        console.error('Error connection MongoDB: ' + err);
    } else {
        console.error('MongoDB is connected');
    }
});


router.get('/', (req, res) => {
    res.send('Hi from API route');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    user.save((error, registerUser) => {
        if (error) {
            console.error(error);
        } else {
            res.status(200).send(registerUser);
        }
    });

});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({
            email: userData.email
        },
        (error, user) => {
            if (error) {
                console.error(error);
            } else if (!user) {
                res.status(401).send('invalid  email');
            } else if (user.password != userData.password) {
                res.status(401).send('invalid  password');
            }
            else{
                res.status(200).send(user);
            }

        })
});

module.exports = router;