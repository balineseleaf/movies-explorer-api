const router = require('express').Router(); // создаёт объект, на который мы и повесим обработчики
const { validateSignIn, validateSignUp } = require('../utils/validation');
const { login, postUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./users'); // импортируем роут пользователя из users.js
const movieRouter = require('./movies'); // импортируем роут с фильмами из movies.js

router.post('/signin', validateSignIn(), login);

router.post('/signup', validateSignUp(), postUser);

router.use('/users', auth, userRouter); // добавл мидлвеир авторизации

router.use('/movies', auth, movieRouter); // добавл мидлвеир авторизации

router.post('/signout', logout);

router.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
