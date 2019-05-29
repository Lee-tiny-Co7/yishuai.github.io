/* @flow */

const { MongoClient } = require('mongodb');
var assert = require('assert');


export function getDatabase() {
  // Local connection URL
  var url = process.env.MONGODB_URI;

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      resolve(db);
    });
  });
}

