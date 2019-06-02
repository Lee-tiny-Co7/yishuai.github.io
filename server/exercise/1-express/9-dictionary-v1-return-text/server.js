const express = require('express');
const app = express();

// Load a JSON file containing english words.
const englishDictionary = require('./dictionary.json');

app.use(express.static('public'));

function onPrintWord(req, res) {
  const routeParams = req.params;
  const word = routeParams.word;

  const key = word.toLowerCase();
  const definition = englishDictionary[key];

  res.send(`The definition of ${word} is ${definition}`);
}
app.get('/print/:word', onPrintWord);


app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
