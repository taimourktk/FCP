const express = require('express');
const cors = require('cors');
const samples = require('./training_data.json');
const Predicter = require('./Predicter');

const app = express();
app.use(cors());
const predicter = new Predicter(samples);

app.get('/', function (req, res) {
    return res.send({ isNegative: predicter.predict(req.query.text) })
});

app.listen("5007");
