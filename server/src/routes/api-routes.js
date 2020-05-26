const express = require("express");
const { verifyToken, sign, findEvents } = require("../common/jwt-manager");
const db = require("../common/db-manager");
db.connect();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi from API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;

  db.saveUser(userData, ({registerUser}) => {
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

  db.findUser(userData, ({error, user}) => {

    if (error) {
      console.log("login error " ,error );

      res.status(401).send(error);
    } else if (user) {

      console.log("login user " ,user );

      let payload = {
        subject: user._id,
      };
      
      let token = sign(payload);

      res.status(200).send({
        token,
      });
    } else {
      res.status(500).send("Internal Server error");
    }
  });
});

router.get("/events", (req, res) => {
  let events = db.findEvents();
  res.json(events);
});

router.get("/special", verifyToken, (req, res) => {
  let events = db.findSpecialEvents();
  res.json(events);
});
module.exports = router;
