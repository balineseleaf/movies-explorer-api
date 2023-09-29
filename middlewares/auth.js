const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) { // Сначала обработаем ошибку — случай, когда токена нет в заголовке:
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', ''); // извлекаем токен из заголовка и выкидываем приставку Bearer, таким образом, в переменную token запишется только JWT.
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT : 'dev-secret', { expiresIn: '7d' }); // После извле ток из запроса нужно убед,
  } catch (err) { // что польз прислал тот токен, кот был выдан ему ранее.
    // Такую проверку осуществляет метод verify модуля jsonwebtoken. Метод принимает на вход два
    // параметра —
    // токен и секретный ключ, которым этот токен был подписан:
    // Метод jwt.verify вернёт пейлоуд токена
    return next(new UnauthorizedError('Некорректный токен'));
  }

  req.user = payload;// записываем пейлоуд в объект запроса

  return next();// пропускаем запрос дальше
}

module.exports = auth;
