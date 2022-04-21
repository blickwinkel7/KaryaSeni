'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    
    get fullName() {
      return '' + this.firstName + ' ' + this.lastName
    }

    static formatDate(date) {
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleString('en-EN', options)
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty!"
        },
        notNull: {
          msg: "First name cannot be empty!"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty!"
        },
        notNull: {
          msg: "Last name cannot be empty!"
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date of birth cannot be empty!"
        },
        notNull: {
          msg: "Date of birth cannot be empty!"
        }
      }
    },
    imagerUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Profile picture cannot be empty!"
        },
        notNull: {
          msg: "Profile picture cannot be empty!"
        }
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};