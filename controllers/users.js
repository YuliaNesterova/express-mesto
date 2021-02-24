const User = require('../models/user');
const {
  ERROR_CODE_INVALID, ERROR_CODE_NOT_FOUND, ERROR_CODE_SERVER, CODE_OK,
} = require('../utils/responces');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(CODE_OK).send({ data: users }))
    .catch(() => res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(CODE_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(CODE_OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INVALID).send({ message: 'Введены невалидные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      res.status(CODE_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INVALID).send({ message: 'Введены невалидные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.status(CODE_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INVALID).send({ message: 'Введены невалидные данные' });
      } else {
        res.status(ERROR_CODE_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};
