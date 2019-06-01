/* @flow */

var express = require('express');
var bodyParser = require('body-parser')

var { validateToken } = require('../lib/auth');
var { getDatabase } = require('../lib/db');
var { Notes } = require('../models/notes');
var { Users } = require('../models/users');

var router = express.Router();

var jsonParser = bodyParser.json()

type UserInfo = {
  gmail_id: string;
  email: string; 
};
// Log in user and retrieve notes.
router.post('/login', jsonParser, (req, res) => {
  const id_token = req.body.id_token;

  if (!id_token) {
    res.json({
      success: false,
      error: 'Missing required parameter',
    });
    return;
  }

  (async function() {
    var user_info = await validateToken(id_token);
    var db = await getDatabase();
    if (!db || !user_info) {
      return { success: false };
    }

    let users = new Users(db);
    let notes_model = new Notes(db);
    var user_record = await users.getUser(user_info);
    if (!user_record) {
      return { success: false };
    }

    let notes = await notes_model.getNotesByIds(user_record.value.notes);
    db.close();
    return {
      success: true,
      user_info: user_record.value,
      notes: notes
    };
  })().then((value) => {
    res.json([value]);
  },
  (err) => {
    res.json([{
      success: false,
      error: err.stack
    }]);
  });
});

// Save note to the server.
router.post('/notes', jsonParser, (req, res) => {
  const id_token = req.body.id_token;
  const contents = req.body.contents || '';
  const week_id = req.body.week_id;

  if (!id_token || !week_id) {
    res.json({
      success: false,
      error: 'Missing required parameter',
    });
    return;
  }

  (async function() {
    var user_info = await validateToken(id_token);
    var db = await getDatabase();
    if (!db || !user_info) {
      return { success: false };
    }

    let users = new Users(db);
    var user_record = await users.getUser(user_info);
    if (!user_record) {
      return { success: false };
    }

    let notes = new Notes(db);
    var user_id = user_record.value._id;
    await notes.saveNote(user_id, week_id, contents);

    db.close();
    return {
      success: true
    };
  })().then((value) => {
    res.json([value]);
  },
  (err) => {
    res.json([{
      success: false,
      error: err.stack
    }]);
  });
});

module.exports = router;
