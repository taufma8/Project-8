const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,    //to generate the primary key column using the property name defined in the model
    //     autoIncrement: true, //generates an ID that increments by 1 for each new entry.
    // },
    title: {
        type: Sequelize.STRING,
        allowNull: false, //disallow null.
        validate: {
            notNull: {
                msg: 'Please provide a value for "title"',
            },
            notEmpty: {
                msg: 'Please provide a value for "title"',
            },
         },
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide a value for "author"',
            },
            notEmpty: {
                msg: 'Please provide a value for "author"',
            },
         },
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide a value for "runtime"',
            },         
        },
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide a value for "runtime"',
            }, 
        },
    }
  }, { sequelize });

  return Book;
};