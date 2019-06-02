const express = require('express');
const bodyParser = require('body-parser');

const dbHelper = require('../db');

const router = express.Router();
const jsonParser = bodyParser.json();

const users = ['John', 'Betty', 'Hal'];
router.get('/users', jsonParser, (req, res) => {
  console.log('hello');
  (async function () {
    console.log('async');
    var db = await dbHelper.getDatabase();
    dbHelper.fixtures(db);
    console.log('awaited');
    res.json(users);
    console.log('awaited2');
  })();
});

module.exports = router;
