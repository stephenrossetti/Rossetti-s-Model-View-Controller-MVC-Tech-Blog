const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Create table data for Post //
// ID, topic, descr, date_created, user_id as foreign key //
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    topic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
