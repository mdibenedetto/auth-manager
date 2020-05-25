const User = require("../models/user");
const mongoose = require("mongoose");

function connect() {
  const db = "mongodb://mike:mike@ds121349.mlab.com:21349/events-manager";

  mongoose.connect(db,{ useNewUrlParser: true } , (err) => {
    if (err) {
      console.error("Error connection MongoDB: " + err);
    } else {
      console.error("MongoDB is connected");
    }
  });
}

function saveUser(userData, callBack) {
  let user = new User(userData);

  user.save((error, registerUser) => {
    if (error) {
      console.error(error);
      callBack({ error });
    } else {
      callBack({ registerUser });
    }
  });
}

function findUser(userData, callBack) {

  User.findOne(
    {
      email: userData.email,
    },
    (error, user) => {
     
      if (error) {
        console.error(error);
        callBack({ error });
      } else if (!user) {
        callBack({ error: "invalid  email" });
      } else if (user.password != userData.password) {
        callBack({ error: "invalid  password" });
      } else {
        callBack({ user });
      }
    }
  );
}

function findEvents() {
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

  return events;
}

function findSpecialEvents() {
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

  return events;
}
module.exports = {
  connect,
  saveUser,
  findUser,
  findEvents,
  findSpecialEvents,
};
