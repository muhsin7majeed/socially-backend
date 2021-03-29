const throwErr = (err) => {
  throw new Error(err);
};

exports.PORT = process.env.PORT || 5000;

const jwtKey = process.env.JWT_SECRET_KEY;
if (!jwtKey) throwErr('Make sure JWT_SECRET_KEY is set in env');
exports.jwtKey = jwtKey;

const { DB_NAME, DB_HOST, DB_USER, DB_PWD, DB_PORT } = process.env;

if (!DB_NAME) throwErr('Make sure DB_NAME is set in env');
if (!DB_HOST) throwErr('Make sure DB_HOST is set in env');
if (!DB_USER) throwErr('Make sure DB_USER is set in env');
if (!DB_PWD) throwErr('Make sure DB_PWD is set in env');
if (!DB_PORT) throwErr('Make sure DB_PORT is set in env');

exports.dbConfig = {
  DB_PWD,
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PORT,
};
