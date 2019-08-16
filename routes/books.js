
// //Setting up to use the db folder we created.
// // const db = require('./db');
// // const { Book } = db.models;

// //Setting up express
// const express = require('express');
// const router = express.Router();

// //Setting up sequelize
// const Sequelize = require('sequelize');

// //Adding routes and sending strings to the client.
// //Merges the data with the templates to surf dynamic pages.
// //Home route should redirect to the /books route.
// // router.get('/', (req, res, next) => {
// //     res.redirect('/books')
// // });

// //Shows the full list of books.
// router.get('/books', (req, res, next) => {
//     res.render('index', {book})
// });

// //Shows the create new book form.
// router.get('/books/new', (req, res, next) => {
//     res.render('/db/models/books/new');
// });
  
// //Posts a new book to the database.
// router.post('/books/new', async (req, res, next) => {
//     const book = await Book.create(req.body);
//     res.render('/db/models/books/:id');
// });

// //Shows book detail form.
// router.get('/books/:id', async (req, res, next) => {
//     res.render('/db/models/books/:id');
// });
  
// //Updates book info in the database.
// router.post('/books/:id/edit', async (req, res, next) => {
//     const book = await Book.findByPk(req.params.id);
//     res.render('/db/models/books/edit', {book, title: 'Edit Book'});
// });
  
// //Deletes a book. 
// router.post('/books/:id/delete', async (req, res,) => {
//     const bookToDelete = await Book.findByPk(req.params.id);
//     await bookToDelete.destroy();
//     res.render('/db/models/books');
// });

// // router.listen(3000, () => {
// //     console.log('The application is running on localhost:3000!');
// // });

// module.exports = router;