// Require Models from Post and User
const User = require('./User');
const Post = require('./Post');

// Many to many relationship. User can have many Posts //
// Foreign key of user_id and delete all posts if user user is deleted //
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Each post will belong to one user //
// This will also help with only one user deleting their own post //
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };
