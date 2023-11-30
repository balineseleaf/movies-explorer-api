const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

function auth(req, res, next) {
  const { authorization } = req.cookies;
  console.log('1', authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) { // Сначала обработаем ошибку — случай, когда токена нет в заголовке:
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  console.log('token', token);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT : 'dev-secret', { expiresIn: '7d' });
  } catch (err) {
    return next(new UnauthorizedError('Некорректный токен'));
  }

  req.user = payload;

  return next();
}

module.exports = auth;
