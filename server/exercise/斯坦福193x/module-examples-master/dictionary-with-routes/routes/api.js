const express = require('express');
const router = express.Router();

async function onLookupWord(req, res) {
  const routeParams = req.params;
  const word = routeParams.word;

  const query = { word: word.toLowerCase() };
  const result = await req.collection.findOne(query);
  const definition = result ? result.definition : '';

  const response = {
    word: word,
    definition: definition
  };
  res.json(response);
}
router.get('/lookup/:word', onLookupWord);

module.exports = router;
