const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();

const jsonParser = bodyParser.json();
app.use(bodyParser.json());

app.use(express.static('public'));

let db = null;
async function main() {
  const DATABASE_NAME = 'cs193x-db';
  const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

  // The "process.env.MONGODB_URI" is needed to work with Heroku.
  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);

  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);


};

main();

////////////////////////////////////////////////////////////////////////////////

/*async function onGet(req,res){
  const cardId = req.params.cardId;
  const collection = db.collection('card');
  const doc = await collection.findOne({ _id: ObjectID(cardId)});

  res.render('card', { message: doc.message, style: doc.style } );
}

app.get('/id/:cardId', onGet);
*/

/*async onSave(req, res){
  const entries = req.body.entries;
  const doc = {
    entries: entries
  };

  const collection = db.collection('card');
  const response = await collection.insertOne(doc);

  res.json({cardId: response.insertedId});
}
app.post('/id/:diaryId', jsonParser, onSave);
*/


/*async function newEntry(req, res) {
  const entry = req.body.entry;

  const Entry = {
    entry: entry
  };

  const collection = db.collection('entry');
  const response = await collection.insertOne(Entry);

  res.json({ entryId: response.insertedId });
}
app.post('/save', jsonParser, newEntry);

async function onGetEntry(req, res) {
  const entryId = req.params.entryId;
  const collection = db.collection('entry');
  const response = await collection.findOne({ _id: ObjectID(entryId) });
  res.json(response);
}
app.get('/get/:diaryId', onGetEntry);
*/





//////////////////WORKING/////////////////////

async function newDiary(req, res) {
  const entries = req.body.entries;

  const diary = {
    entries: entries
  };

  const collection = db.collection('diaries');
  const response = await collection.insertOne(diary);

  res.json({ diaryId: response.insertedId });
}
app.post('/id', jsonParser, newDiary);

/*async function onCreateDiary(req, res) {
  const response = await req.hoops.insertOne({});
  res.json({ id: response.insertedId });
}
app.post('/id', jsonParser, onCreateDiary);
*/

async function upsertEntry(req, res){
  //console.log(req.body);
    const collection = db.collection('diaries');
    const diaryId = req.params.diaryId;
    const entries = req.params.entries;
    const query = {
      diaryId: diaryId
    }
    const newEntry = {
      diaryId: diaryId,
      entries: entries
    }
    const params = {
      upsert: true
    }
    const response = await collection.update(query, newEntry, params);
    res.json(response);
}
app.post('/ups/', upsertEntry);


async function onGetDiary(req, res) {
  const diaryId = req.params.diaryId;
  const collection = db.collection('diaries');
  const response = await collection.findOne({ _id: ObjectID(diaryId) });
  //const textResponse = HttpResponse(response, mimetype="text/html");
  res.json(response);
  //res.render('diaries', {entries: response.entries});
  console.log(res);

}
app.get('/id/:diaryId', onGetDiary);
//////////////////WORKING/////////////////////



/*
async function setEntry(req, res) {
  const routeParams = req.params;
  const entry = routeParams.entry;
  const diaryId = routeParams.diaryId;
  const query = { diaryId: diaryId };
  const newEntry = { entry: entry };
  const params = { upsert: true };
  const collection = db.collection('diaries');
  const response =
      await collection.update(query, newEntry, params);

  res.json({ success: true });
}
app.post('/set/:entry', jsonParser, setEntry);


*/





/*
async function update(req,res) {

  const query = {
    word: word
  };
  const newEntry = {
    word: word,
    definition: definition
  };
  const params = {
    upsert: true
  };
  const response = await collection.update(query, newEntry, params);


  /*const diaryId = req.params.diaryId;
  const collection = db.collection('diaries');
  const response = await collection.findOne({ _id: ObjectID(diaryId) });
  res.json(response);
  console.log(response);
  const entries = {
    entry: entry
  };
  const collection2 = db.collection('entries');
  const response2 = await collection2.insertOne(entry);

  res.json({ entryId: response2.insertedId });

}
app.patch('/patch/:diaryId/:entryId', jsonParser, update);*/

async function onAllOtherPaths(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}
app.get('*', onAllOtherPaths);
