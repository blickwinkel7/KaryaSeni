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
      Art.hasMany(models.Transaction)
      Art.belongsToMany(models.User, {
        through:models.Transaction
      })
    }
  }
  Art.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    imageUrl:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Art',
  });
  return Art;
};