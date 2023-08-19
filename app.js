const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const { router } = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./utils/config');

mongoose.connect(DB);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);
app.use(router);
app.use(errorLogger);

app.use(errorHandler);
app.listen(SERVER_PORT);
