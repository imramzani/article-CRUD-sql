'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Title cannot be empty'
        },
        len: {
          args: [20],
          msg: 'Title minimum 20 characters'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Content cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Content cannot be empty'
        },
        len: {
          args: [200],
          msg: 'Content minimum 200 characters'
        }
      }
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Category cannot be empty'
        },
        len: {
          args: [3, 100],
          msg: 'Category minimum 3 characters'
        }
      }
    },
    created_date: DataTypes.DATE,
    updated_date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('Publish', 'Draft', 'Trash'),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Status cannot be empty'
        },
        isIn: {
          args: [['Publish', 'Draft', 'Trash']],
          msg: "Status must be either 'Publish', 'Draft', or 'Trash'"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};