// Separate routes for the main dashboard //
const router = require('express').Router();
const { Post, User, Comment  } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await Post.findAll({
            where : {
                user_id : req.session.user_id
            }, include : [{
                model: Comment, 
                include : {
                    model : User,
                    attributes : ['user_name']
                }
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
                    attributes : ['user_name']
                }}, 
                {
                model: User, 
                attributes: ['user_name']
                }
        ]});
        const updatePost = postData.get({ plain: true });
            res.render('updatePost', {
                updatePost,
            });
        } catch (err) {
            res.status(500).json(err);
        }
});