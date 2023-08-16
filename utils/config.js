require('dotenv').config();

const {
  PORT,
  JWT_SECRET,
  DB_HOST,
  NODE_ENV,
} = process.env;

const DEV_PORT = 3000;
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const DEV_JWT_SECRET = 'super-secret-key';

const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;
const SECRET_KEY = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_JWT_SECRET;

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_KEY,
};
