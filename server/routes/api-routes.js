const express = require("express");
const { verifyToken, sign } = require("./jwt-manager");
const db = require("./db-manager");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi from API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  db.saveUser(userData, (registerUser) => {
    let payload = {
      subject: registerUser._id,
    };
    let token = sign(payload);

    res.status(200).send({
      token,
    });
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  db.findUser((error, user) => {
    if (error) {
      res.status(401).send(error);
    } else {
      let payload = {
        subject: user._id,
      };
      let token = jwt.sign(payload, SECRET_KEY);

      res.status(200).send({
        token,
      });
    }
  });
});

router.get("/events", (req, res) => {
  let events = [];

  for (let i = 0; i < 50; i++) {
    let event = {
      _id: i + 1,
      name: "Auto",
      desciption: "Lorem ipsum",
      date: "2018-04-20T18:25:43.511Z",
    };
    events.push(event);
  }
  res.json(events);
});

router.get("/special", verifyToken, (req, res) => {
  let events = [];
  for (let i = 0; i < 50; i++) {
    let event = {
      _id: i + 1,
      name: "Auto",
      desciption: "Lorem ipsum",
      date: "2018-04-20T18:25:43.511Z",
    };
    events.push(event);
  }
  res.json(events);
});
module.exports = router;
