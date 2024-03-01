// Separate routes for the main dashboard //
// This is more individualized for the signed in user //
const router = require('express').Router();
const { Post, User, Comment  } = require('../models');

router.get('/', async (req, res) => {
    try {
        const userData = await Post.findAll({
            where : {
                user_id : req.session.user_id
            },
            include : [{
                model: Comment, 
                include : {
                    model : User,
                    attributes : ['name']
                },
            }]
        });

        const userPosts = userData.map((post) => post.get({ plain: true}));
            res.render('dashboard', {
                userPosts, 
                logged_in: req.session.logged_in, 
            });
        } catch (err) {
            res.status(500).json(err);
        }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id,
           {  include : [{
                model: Comment, 
                include : {
                    model : User,
                    attributes : ['name']
                }}, 
                {
                model: User, 
                attributes: ['name']
                }
        ]});
        const editPost = postData.get({ plain: true });
            res.render('edit', {
                editPost,
                logged_in: req.session.logged_in, 
            });
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router;