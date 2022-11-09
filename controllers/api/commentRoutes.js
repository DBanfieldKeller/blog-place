const router = require('express').Router();
const { Comment, Post } = require('../../models');


// new comment
router.post('/:post_id', async (req, res) => {
    try {
        const postExists = await Post.findByPk(req.params.post_id);
        if (!postExists) {
            res.status(404).json({ message: 'No post found with this id' })
        };
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.post_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;