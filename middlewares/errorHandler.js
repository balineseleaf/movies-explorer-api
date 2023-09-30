function errorHandler(err, req, res, next) { // принято обрабатывать ошибки централизованно.
  // Для этого нужно добавить приложению мидлвэр такого вида:
  const { statusCode = 500, message } = err;
  console.dir(err);
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
}

module.exports = errorHandler;
