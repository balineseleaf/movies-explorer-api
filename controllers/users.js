const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require('../models/users');

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT } = process.env;

// находим себя
const getUser = (req, res, next) => {
  const { _id } = req.user;
  return userSchema
    .findById(_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => userSchema.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name, email: user.email, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(`Некорректные данные: ${err.name}`));
      }
      return next(err);
    });
};

// обновить данные
const updateUser = (req, res, next) => {
  const { name, email } = req.body; // обновленные данные пользователя
  return userSchema
    .findByIdAndUpdate(
      req.user._id, // извлекаем id из объекта req.user
      { name, email },
      { new: true, runValidators: true }, // проверяет поля перед сохранением в БД,
      // new - возвращает новый документ
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(`Некорректные данные: ${err.name}`));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return (
    userSchema
      .findOne({ email })
      .select('+password') // Хэш пароля нужен
      // Чтобы найти польз. по почте, нам потребуется метод findOne, которомупередадим на вход email
      .then((user) => {
        // не нашёлся — отклоняем промис
        if (!user) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        return bcrypt.compare(password, user.password, (error, isValid) => {
          // нашёлся—сравниваемхеши
          if (isValid) {
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT : 'dev-secret',
              { expiresIn: '7d' },
            );
            return res.status(200).send({ token });
          }
          return next(new UnauthorizedError('Неправильные почта или пароль'));
        });
      })
      .catch(next)
  );
};

// Контроллер запроса выхода пользователя
// const logout = (req, res) => {
//   res.clearCookie('token').send({ message: 'Куки удалены' });
// };

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
