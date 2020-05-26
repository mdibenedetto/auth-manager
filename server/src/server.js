const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const apiRoutes = require("./routes/api-routes");
const app = express();

const CLIENT_FOLDER = "/../client";
const STATIC_FILES = __dirname + CLIENT_FOLDER;
app.use("/", express.static(STATIC_FILES + "/"));

app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiRoutes);

// NEEDED TO WEB APP ROUTING
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/", function (req, res) {
  res.send("server received a GET request...");
});

app.post("/", function (req, res) {
  res.send("server received a POST request...");
});

app
  .listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
  })
  .on("error", (err) => {
    const message = `${err}.
    ${PORT} + " is already in use".
    It will be tried to set a random PORT`;
    console.log(message);

    const listener = app.listen(0, () => {
      console.log(
        "Server running on http://localhost:" + listener.address().port
      );
    });
  });
