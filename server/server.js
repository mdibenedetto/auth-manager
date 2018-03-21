const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const api = require('./routes/api');
const app = express();

app.use(bodyParser.json());

app.use('/api', api);

app.get('/', function (req, res) {
    res.send('server received a request...'); 
});

app.listen(PORT, function () {
    console.log('Server running on localhost:' + PORT);
});