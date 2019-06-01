const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  createValidated(db, function() {
    client.close();
  });
});


function createValidated(db, callback) {
  db.createCollection("contacts",
	   {
	      'validator': { '$or':
	         [
	            { 'phone': { '$type': "string" } },
	            { 'email': { '$regex': /@mongodb\.com$/ } },
	            { 'status': { '$in': [ "Unknown", "Incomplete" ] } }
	         ]
	      }
	   },
    function(err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};
