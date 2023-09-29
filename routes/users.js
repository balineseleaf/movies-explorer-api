const userRoutes = require('express').Router(); // создаёт объект, на который мы и повесим обработчики:
const { validateUpdateUser } = require('../utils/validation');

const {
  updateUser, getUser,
} = require('../controllers/users'); // импортируем методы

userRoutes.get('/me', getUser);

userRoutes.patch('/me', validateUpdateUser(), updateUser);

module.exports = userRoutes;
