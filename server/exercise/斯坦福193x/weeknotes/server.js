/* @flow */

const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

var notes_router = require('./routes/notes');

const app = express();

if (app.get('env') === 'development') {
  // Dev-only.
  // TODO(vrk): This seems like the wrong thing to do. There's probably some way I
  // can get the same behavior without having to add this code, e.g. using some
  // command-line flags in the "npm run" script.
  // https://github.com/vrk/weeknotes/issues/32
  const dotenv = require('dotenv');
  dotenv.config();
} else {
  // Prod-only.
  // TODO(vrk): Should probably move this to a proper middleware file.
  app.get('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(['https://', req.get('Host'), req.url].join(''));
    } else {
      next();
    }
  });
}

app.set('port', (process.env.PORT || 3100));

app.use('/api', notes_router);

if (process.env.BUILD_WEBPACK === 'true') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(app.get('port'));
