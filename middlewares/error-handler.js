const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants;
const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errBody = err.details.get('body');
    const { details: [errorDetails] } = errBody;
    res.status(HTTP_STATUS_BAD_REQUEST).send({ message: errorDetails.message });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка.'
        : message,
    });
  }

  next();
};

module.exports = errorHandler;
