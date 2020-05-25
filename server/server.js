const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;
const apiRoutes = require('./routes/api-routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.get('/', function (req, res) {
    res.send('server received a GET request...'); 
});

app.post('/', function (req, res) {
    res.send('server received a POST request...'); 
});

app.listen(PORT, function () {
    console.log('Server running on localhost:' + PORT);
});