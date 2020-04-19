const express = require('express');

const db = require('./db.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const post = req.body;
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
    const { id } = req.params;
    const commentInfo = { ...req.body, post_id: id }
    if (!commentInfo) {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    } else if (!commentInfo.text) {
      res.status(400).json({ message: 'Please provide text for the comment' })
    } else {
      const inserted = await db.insertComment(commentInfo);
      res.status(201).json(inserted)
    }
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
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.findById(id);
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    }
  }
  catch (err) {
    res.status(500).json({ err, message: 'The post information could not be retrieved' })
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const postComments = await db.findPostComments(id);
    if (postComments) {
      res.status(200).json(postComments)
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    }
  }
  catch (err) {
    res.status(500).json({ err, message: 'The comments information could not be retrieved' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await db.remove(id);
    if (!removed) {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    } else {
      res.status(200).json(removed)
    }
  }
  catch (err) {
    res.status(500).json({ err, message: 'The post could not be removed' })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    const updated = await db.update(id, post);
    if (!post) {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    } else if (!post.title || !post.contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
      res.status(200).json(updated)
    }
  }
  catch (err) {
    res.status(500).json({ err, message: 'The post information could not be modified' })
  }
})


module.exports = router;