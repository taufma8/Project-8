//Setting up to use the db folder we created.
const db = require('./db');
const { Book } = db.models;

//Setting up express
const express = require('express');
const app = express();

//Using third party middleware
const bodyParser = require('body-parser');
//Setting up middleware
app.use(bodyParser.urlencoded({ extended: false}));

//Setting up pug
//Update code in app to use Pug
app.set('view engine', 'pug');

//Using a static route and the express.static method to serve the static files located in the public folder.
app.use('/static', express.static('public'));

(async () => {
  //sync all models and create tables that do not exist in the database. 
  //accepts an object with a force parameter that lets you control the database synchronization.
  //force: true--drop a table that exists, each time you start your app, and recreate it from the model definition.
  await db.sequelize.sync({ force: true });

  try {

  } catch (error) {
    // console.error('Error connecting to the database: ', error);
    //If the error is SequelizeValidationError, map over the error item(s) and return an array holding any error messages.
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
    //In the else block, use a throw statement to rethrow other types of errors caught by catch.
        } else {
            throw error;
        } 
    }
})();

//Adding routes and sending strings to the client.
//Merges the data with the templates to surf dynamic pages.
//Home route should redirect to the /books route.
app.get('/', (req, res, next) => {
    res.redirect('/books')
});

//Shows the full list of books.
app.get('/books', (req, res, next) => {
    res.render('index', {books})
});

//Shows the create new book form.
app.get('/books/new', (req, res, next) => {
    res.render('/db/models/new');
});

//Posts a new book to the database.
app.post('/books/new', (req, res, next) => {
    res.render('/db/models/new');
});

//Shows book detail form.
app.get('/books/:id', (req, res, next) => {
    res.render('/db/models/:id');
});

//Updates book info in the database.
app.post('/books/:id', (req, res, next) => {
    res.render('/db/models/:id');
});

//Deletes a book. 
app.post('/books/:id/delete', (req, res, next) => {
    res.render('/db/models/:id/delete');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

// //Include Sequelize in your program. 
// const Sequelize = require('sequelize');

// //Pass the Sequelize() constructor an object with the parameters dialect and storage.
// //dialect: specific version of SQL you're using.
// //storage: to specify the file path or the storage engine for SQLite.
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'library.db'
//   });

// //Define the async immediately invoked function expression (IIFE) function.
// // (async () => {
// //Inside the try block, log a "success" message to the console. 
// //   try {
// //to test that the connection is OK and you can connect to the database.
//     // await sequelize.authenticate();
//     // console.log('Connection to the database successful!');
// //In the catch block, use console.error() to print an 'error' message displaying the error.
// //   } catch (error) {
// //     console.error('Error connecting to the database: ', error);
// //   }
// // })();

// //Book model
// //extending from Sequelize.Model, which is part of Sequelize's API for model definition.
// class Book extends Sequelize.Model {}
// //Call the static class init() method on the model name to initialize and configure the model.
// //This defines a new table in the database. Sequelize will look for information in this table.
// //model name is singular and the table name is plural. 
// Book.init({
// //title is an attribute and also a column of the table.
// //second argument is the data type.
//   title: Sequelize.STRING,
//   author: Sequelize.STRING,
//   genre: Sequelize.STRING,
//   year: Sequelize.INTEGER,
// //initializes a model representing a 'Book' table in the database, with one column: 'title'.
// }, { sequelize });