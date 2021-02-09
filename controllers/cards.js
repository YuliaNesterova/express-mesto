const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '../', 'data', 'cards.json');

function getCards(req, res) {
  return getDataFromFile(dataPath)
    .then(cards => res.status(200).send(cards))
    .catch(error => res.status(400).send(error));
}

module.exports = getCards;