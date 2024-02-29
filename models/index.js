// Require Models from Post and User and Comment 
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

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

// Same thing for comments and user (i.e, user can have many commenets, but comment has one user) //
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
