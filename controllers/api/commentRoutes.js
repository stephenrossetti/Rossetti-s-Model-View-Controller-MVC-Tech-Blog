// Create a route for comments since we will need to grab specific comment IDs to attached to blog posts //
const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:id', async (req, res) => {
try {
    const newComment = await Comment.create({
        ...req.body,
        post_id: req.params.id,
        user_id: req.session.user_id
    });
    res.status(200).json(newComment);
} catch (err) {
    res.status(400).json(err);
}
});

module.exports = router;