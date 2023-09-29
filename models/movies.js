const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: { // страна
    type: String,
    required: true,
  },
  director: { // режиссер
    type: String,
    required: true,
  },
  duration: { //  продолжительность фильма
    type: Number,
    required: true,
  },
  year: { //  год выпуска фильма
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму: строка, URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введен некорректный адрес url',
    },
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введен некорректный адрес url',
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введен некорректный адрес url',
    },
  },
  owner: { //  _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // id фильма, из ответа сервиса MoviesExplorer
    type: Number,
    required: true,
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
