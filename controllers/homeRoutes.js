// Require express and authentication//
// Grab Post and User from models //
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Run a get request //
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data //
        // Include name to specifically add that associated name //
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it //
        // Plain removes unneeded meta data //
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template //
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for specific post called out by ID //
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route //
// Only allows logged in user to view their own dashboard posts //
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID //
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Basic login router //
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route //
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;
