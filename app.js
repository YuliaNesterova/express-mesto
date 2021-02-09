const express = require('express');
const path = require('path');
const app = express();
const router = require('express').Router();
const users = require('./data/users.json');
const cards = require('./data/cards.json')

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(PORT, () => {})

router.get('/users', (req, res) => {
  res.send(users)
});

router.get('/cards', (req, res) => {
  res.send(cards)
});

router.get('/users/:id', (req, res) => {


})