const movieRoutes = require('express').Router(); // создаёт объект, на который мы и повесим обработчики:
const { validateMovieData, validateMovieId } = require('../utils/validation');

const {
  postMovie, getMovies, deleteMovie,
} = require('../controllers/movies'); // импортируем методы

movieRoutes.get('/', getMovies); // запрашиваем фильмы

movieRoutes.post('/', validateMovieData(), postMovie); // создание фильма

movieRoutes.delete('/:movieId', validateMovieId(), deleteMovie); // удалениме фильма

module.exports = movieRoutes;
