const mongoose = require('mongoose');
const movieSchema = require('../models/movies');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// находим все фильмы пользователя
const getMovies = (req, res, next) => {
  const { _id } = req.user;
  movieSchema.find({ owner: _id })
    .then((response) => res.send(response))
    .catch(next);
};

// Сохранение фильма у пользователя
const postMovie = (req, res, next) => {
  const { _id } = req.user; // вытаскиваем из нашего объекта id
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body; // все параметры из схемы
  return movieSchema.create({
    owner: _id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) //  в body все параметры из схемы
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(`Некорректные данные: ${err.name}`));
      } else {
        next(err);
      }
    });
};

// Контроллер удаления фильма из избранного
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  movieSchema.findById(movieId).orFail().then((movie) => {
    if (movie.owner.toString() !== _id) {
      throw new ForbiddenError('Нельзя удалять чужие фильмы!');
    }
    return movie.deleteOne();
  }).then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(`Неверный id: ${movieId}`));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError(`Фильм с таким id не существует: ${movieId}`));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, postMovie, deleteMovie,
};
