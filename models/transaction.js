'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Art)
      Transaction.belongsTo(models.User)
    }
  }
  Transaction.init({
    price: DataTypes.INTEGER,
    UserId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    ArtId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};