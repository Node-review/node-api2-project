const express = require('express');

const db = require('./db.js');

const router = express.Router();

router.post('/', async (req, res) => {
  const post = req.body;
  try {
    if (post.contents && post.title) {
      const inserted = await db.insert(post);
      res.status(201).json(inserted);
    } else {
      res.status(400).json({ message: 'Please provide title and contents for post.' })
    }
  }
  catch (err) {
    res.status(500).json({ err, message: 'There was an error while saving post to the database' })
  }
});

router.post('/:id/comments', async (req, res) => {

  try {

  }
  catch (err) {
    res.status(500).json({ message: 'There was an error while saving the comment to the database' })
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json({ message: 'The posts information could not be retrieved' })
  }
})

module.exports = router;