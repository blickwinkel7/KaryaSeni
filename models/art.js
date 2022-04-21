'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Art.hasOne(models.Transaction)
    }
  }
  Art.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty:{
          msg: `Art name is required!`
        }
      }
    },
    author:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty:{
          msg: `Author name is required!`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Put your art price!`
        }
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Put your description!`
        }
      }
    },
    status: DataTypes.BOOLEAN,
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty:{
          msg: `Image is required!`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Art',
    hooks: {
      beforeCreate:(instance, option) =>{
        instance.status = true
      }
    }
  });
  return Art;
};