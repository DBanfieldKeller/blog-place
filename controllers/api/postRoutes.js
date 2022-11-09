const router = require('express').Router();
const { Post } = require('../../models');


// new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        name: req.body.name,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
        },
      });

    if (!updatedPost) {
      res.status(404).json({ message: 'No post found with this id' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
})



// delete post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;