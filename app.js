require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate'); // обработчик ошибок celebrate
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const { DB_URL } = require('./config');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const corseAllowedOrigins = ['*',
  // 'https://movies.balineseleaf.nomoredomainsrocks.ru',
  // 'http://movies.balineseleaf.nomoredomainsrocks.ru',
  // 'http://localhost:3000',
  // 'http://localhost:3001',
];

// параметры порта
const { PORT = 3000 } = process.env;
// подключаемся к базе данных
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongodb'));

// Создаем приложение
const app = express();

app.use(
  cors({
    origin: corseAllowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(helmet());

app.use(express.json()); // обработка запросов json

app.use(requestLogger); // подключаем логгер запросов

// ограничиваем кол-во запросов
app.use(limiter);

app.use(cookieParser()); // для извлечения данных из куков

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

// используем cors

app.use(errors()); // обработчик ошибок celebrate
// errors() будет обрабатывать только ошибки, которые сгенерировал celebrate.
// Все остальные ошибки он передаст дальше, где их перехватит централизованный обработчик.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
