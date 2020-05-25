const User = require("../models/user");
const mongoose = require("mongoose");

function connect() {
  const db = "mongodb://mike:mike@ds121349.mlab.com:21349/events-manager";

  mongoose.connect(db, (err) => {
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
    } else {
      callBack({ registerUser });
    }
  });
}

function findUser(callBack) {
  User.findOne(
    {
      email: userData.email,
    },
    (error, user) => {
      if (error) {
        console.error(error);
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

module.exports = {
  connect,
  saveUser,
  findUser
};
