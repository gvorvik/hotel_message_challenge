const express = require('express');
const bodyParser = require('body-parser');
const guests = require('./modules/Guests.json');
const companies = require('./modules/Companies.json');
const messages = require('./modules/Messages.json');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/guests', (req, res) => {
    res.send(guests);
});

app.get('/api/companies', (req, res) => {
    res.send(companies);
})

app.get('/api/messages', (req, res) => {
    res.send(messages);
})

app.listen(PORT, () => {
    console.log('app listening at port 5000');
});
