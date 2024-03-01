const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all Posts //
// Need to get/include all Comments and User from their models too //
// User is needed for name specifically to add to the post //
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: Comment,
                include: [{
                    model: User
                }]
            }]
        })
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json({ posts });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get Post by ID //
// Need individual post ID for adding comments or editing posts //
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment
                },
                {
                    model: User
                }
            ]
        });
        const singlePost = postData.get({ plain: true });
        res.status(200).json({ singlePost });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Allows authenticated user to post a new post //
router.post('/', withAuth, async (req, res) => {
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

// Update an existing post //
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete posts made by user if authenticated //
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        // Check/alert if no post exists that is trying to be deleted //
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
