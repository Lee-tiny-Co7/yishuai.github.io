const express = require('express');
const path = require('path');

const accountRouter = require('./routes/account');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/account', accountRouter);

app.use(express.static(path.join(__dirname, 'client/')));

module.exports = app;
