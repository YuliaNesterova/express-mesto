const Card = require('../models/card');
const {
  ERROR_CODE_INVALID, ERROR_CODE_NOT_FOUND, ERROR_CODE_SERVER, CODE_OK,
} = require('../utils/responces');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(CODE_OK).send({ data: cards }))
    .catch(() => res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(CODE_OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INVALID).send({ message: 'Введены невалидные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => res.status(CODE_OK).send({ message: 'Карточка удалена успешно' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(CODE_OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(CODE_OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};
