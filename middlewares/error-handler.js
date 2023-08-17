const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants;
const { isCelebrateError } = require('celebrate');
const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errParams = err.details.get('params');
    const errBody = err.details.get('body');
    const error = typeof errBody === 'undefined' ? errParams : errBody;
    const { details: [errorDetails] } = error;
    res.status(HTTP_STATUS_BAD_REQUEST).send({ message: errorDetails.message });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500
        ? INTERNAL_SERVER_ERROR_MESSAGE
        : message,
    });
  }

  next();
};

module.exports = errorHandler;
