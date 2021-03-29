const router = require('express').Router();
const db = require('../config/db');

const { successResp, errResp } = require('../helpers/responses');
const { validateNewPost } = require('../validators/posts');

router.get('/', (_req, res) => {
  const getPostsQuery = 'SELECT * FROM posts;';

  db.query(getPostsQuery, (err, result) => {
    if (err) return res.status(500).send(errResp());
    if (result.length === 0) {
      return res.status(200).send(successResp({}, 'No Posts Found'));
    }

    return res.status(200).send(successResp(result));
  });
});

router.post('/', (req, res) => {
  const { error } = validateNewPost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const body = { ...req.body, ...req.user };
  const { title, description, privacy, userId, tags = [] } = body;
  const tagsString = tags.join(', ');

  const createPostQuery = `INSERT INTO posts (title, description, privacy, user_id, tags) VALUES ('${title}', '${description}', '${privacy}', '${userId}', '${tagsString}');`;

  db.query(createPostQuery, (e, r) => {
    if (e) return res.status(500).send(errResp());

    return res.status(200).send(successResp({ id: r.insertId, ...req.body }));
  });
});

module.exports = router;
