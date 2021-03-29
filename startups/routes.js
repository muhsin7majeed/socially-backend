const express = require('express');
const error = require('../middlewares/error');
const auth = require('../middlewares/auth.jwt');

const user = require('../routes/user');
const posts = require('../routes/posts');

module.exports = (app) => {
  app.use(express.json());
  app.use('/api/user', user);
  app.use('/api/posts', auth, posts);

  app.use(error);
};
