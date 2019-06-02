const { MongoClient } = require('mongodb');
const assert = require('assert');

exports.getDatabase = function() {
  // Local connection URL
  var url = process.env.MONGODB_URI;

  console.log('new promise');
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      console.log('connected promise');
      assert.equal(null, err);
      resolve(db);
    });
  });
}

function loadFixture(db, jsonPath) {
  const data = require(jsonPath);
  const names = Object.keys(data.collections);
  (async function() {
    for (const name of names) {
      let collection = await db.createCollection(name);
      await collection.insert(data.collections[name]);
    }
  })();
}

exports.fixtures = function(db) {
  loadFixture(db, './test/fixtures/model-peeps.json');
  loadFixture(db, './test/fixtures/model-users.json');
}
