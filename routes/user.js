const router = require('express').Router();
const jwt = require('jsonwebtoken');

const db = require('../config/db');
const { jwtKey } = require('../config/constants');
const { successResp, errResp } = require('../helpers/responses');

const { validateSignup, validateSignin } = require('../validators/auth');
/* --------------------------------- SIGNUP --------------------------------- */

router.post('/signup', (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = req.body;
  const checkIfEmailExistsQuery = `SELECT * FROM users u WHERE u.email = '${email}';`;

  db.query(checkIfEmailExistsQuery, (err, result) => {
    if (err) return res.status(500).send(errResp());
    if (result.length) {
      return res.status(400).send(errResp(`${email} already exists`));
    }

    const { firstName, lastName, password } = req.body;
    const createUserQuery = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`;

    db.query(createUserQuery, (e, r) => {
      if (e) return res.status(500).send(errResp());

      const token = jwt.sign({ userId: r.insertId, email }, jwtKey);

      delete req.body?.password;

      return res
        .status(200)
        .send(successResp({ userId: r.insertId, ...req.body, token }));
    });
  });
});

router.post('/signin', (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  const checkIfEmailExistsQuery = `SELECT * FROM users u WHERE u.email = '${email}';`;

  db.query(checkIfEmailExistsQuery, (err, result) => {
    if (err) return res.status(500).send(errResp());

    if (!result.length) {
      return res.status(400).send(errResp("Email or pasword doesn't match"));
    }

    const checkPasswordQuery = `SELECT * FROM users u WHERE u.email = '${email}' AND u.password = '${password}';`;

    db.query(checkPasswordQuery, (e, r) => {
      if (e) return res.status(500).send(errResp());
      if (!r.length) {
        return res.status(400).send(errResp("Email or Password doesn't match"));
      }

      const token = jwt.sign({ userId: r[0].user_id, email }, jwtKey);
      return res.status(200).send(successResp({ token }));
    });
  });
});

module.exports = router;
