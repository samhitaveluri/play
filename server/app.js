const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const podcastRouter = require('./routes/podcastRouter')();
const artistRouter = require('./routes/artistRouter')();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', [podcastRouter, artistRouter]);

app.listen(process.env.PORT, function () {
  console.log('App listening on port 3002');
});
