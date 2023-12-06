// const { celebrate, Joi } = require('celebrate');
// const { REG_URL } = require('../config');

// function validateSignIn() {
//   return celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//     }),
//   });
// }

// function validateSignUp() {
//   return celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//       name: Joi.string().min(2).max(30),
//     }),
//   });
// }

// function validateMovieData() {
//   return celebrate({
//     body: Joi.object().keys({
//       country: Joi.string().required(),
//       director: Joi.string().required(),
//       duration: Joi.number().required(),
//       year: Joi.string().required(),
//       description: Joi.string().required(),
//       image: Joi.string().required().regex(REG_URL),
//       trailerLink: Joi.string().required().regex(REG_URL),
//       thumbnail: Joi.string().required().regex(REG_URL),
//       movieId: Joi.number().required(),
//       nameRU: Joi.string().required().regex(/^[\W\d]+$/i),
//       nameEN: Joi.string().required().regex(/^[^а-яё]+$/i),
//     }),
//   });
// }

// function validateMovieId() {
//   return celebrate({
//     params: Joi.object().keys({
//       movieId: Joi.string().required().hex().length(24),
//     }),
//   });
// }

// function validateUpdateUser() {
//   return celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().min(2).max(30),
//       email: Joi.string().email(),
//     }),
//   });
// }

// module.exports = {
//   validateSignIn,
//   validateSignUp,
//   validateMovieData,
//   validateMovieId,
//   validateUpdateUser,
// };
