const mysql = require('mysql');
const { dbConfig } = require('./constants');

const { DB_HOST, DB_USER, DB_PWD, DB_NAME, DB_PORT } = dbConfig;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  port: DB_PORT,
});

connection.connect((err) => {
  if (err) throw err;

  console.log(
    `DB connected || host: ${DB_HOST}-${DB_PORT} | user: ${DB_USER} | db: ${DB_NAME}`,
  );
});

module.exports = connection;
