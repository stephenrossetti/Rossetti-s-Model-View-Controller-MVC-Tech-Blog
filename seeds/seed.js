// Require the connection to run sequelize for seed data //
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Grabs user seed data //
  // Ensures hooks are run for each individual (before create and update) //
  // Returns all the data after hashing password (from hooks above) //
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Same for posts and comments // 
  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();