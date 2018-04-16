const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

const mongoose = require('mongoose');
const db = 'mongodb://mike:mike@ds121349.mlab.com:21349/events-manager';
const SECRET_KEY = 'secretKey';

mongoose.connect(db, err => {
    if (err) {
        console.error('Error connection MongoDB: ' + err);
    } else {
        console.error('MongoDB is connected');
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request!');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request!');
    }
    let payload = jwt.verify(token, SECRET_KEY);
    if (!payload) {
        return res.status(401).send('Unauthorized request!');
    }
    req.userId = payload.subject;
    next();
}

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
            let payload = {
                subject: registerUser._id
            };
            let token = jwt.sign(payload, SECRET_KEY);

            res.status(200).send({
                token
            });
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
            } else {
                let payload = {
                    subject: user._id
                };
                let token = jwt.sign(payload, SECRET_KEY);

                res.status(200).send({
                    token
                });
            }

        })
});

router.get('/events', (req, res) => {
    let events = [];
    for (let i = 0; i < 50; i++) {
        let event = {
            _id: i + 1,
            name: 'Auto',
            desciption: 'Lorem ipsum',
            date: '2018-04-20T18:25:43.511Z'
        };
        events.push(event);
    }
    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    let events = [];
    for (let i = 0; i < 50; i++) {
        let event = {
            _id: i + 1,
            name: 'Auto',
            desciption: 'Lorem ipsum',
            date: '2018-04-20T18:25:43.511Z'
        };
        events.push(event);
    }
    res.json(events);
});
module.exports = router;