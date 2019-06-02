const express = require('express');
const router = express.Router();

async function onViewWord(req, res) {
  const routeParams = req.params;
  const word = routeParams.word;

  const query = { word: word.toLowerCase() };
  const result = await req.collection.findOne(query);
  const definition = result ? result.definition : '';

  const placeholders = {
    word: word,
    definition: definition
  };
  res.render('word', placeholders);
}
router.get('/:word', onViewWord);

function onViewIndex(req, res) {
  res.render('index');
}
router.get('/', onViewIndex);

module.exports = router;
