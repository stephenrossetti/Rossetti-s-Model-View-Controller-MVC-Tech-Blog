// Require the connection to run sequelize for seed data //
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Grabs user seed data //
  // Ensures hooks are run for each individual (before create and update) //
  // Returns all the data after hashing password (from hooks above) //
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Loops through all data by post in postData array //
  // Create a new post record in database called Post using post data //
  // Set up a random user ID data fpost that is a foreign key to User for "ID" // 
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();