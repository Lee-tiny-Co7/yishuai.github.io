const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const exphbs  = require('express-handlebars');

const app = express();
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const DATABASE_NAME = 'eng-dict';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
let collection = null;

async function startServer() {
  // Set the db and collection variables before starting the server.
  db = await MongoClient.connect(MONGO_URL);
  collection = db.collection('words');
  // Now every route can safely use the db and collection objects.
  await app.listen(3000);
  console.log('Listening on port 3000');
}
startServer();

////////////////////////////////////////////////////////////////////////////////

// JSON-returning route

async function onLookupWord(req, res) {
  const routeParams = req.params;
  const word = routeParams.word;

  const query = { word: word.toLowerCase() };
  const result = await collection.findOne(query);
  console.log(query);
  console.log(result);

  const response = {
    word: word,
    definition: result ? result.definition : ''
  };
  res.json(response);
}
app.get('/lookup/:word', onLookupWord);

////////////////////////////////////////////////////////////////////////////////

// HTML-returning route

async function onViewWord(req, res) {
  const routeParams = req.params;
  const word = routeParams.word;

  const query = { word: word.toLowerCase() };
  const result = await collection.findOne(query);
  const definition = result ? result.definition : '';

  console.log(result);

  const placeholders = {
    word: word,
    definition: definition,
    layout: false
  };
  res.render('word', placeholders);
}
app.get('/:word', onViewWord);

function onViewIndex(req, res) {
  res.render('index', {layout: false});
}
app.get('/', onViewIndex);
