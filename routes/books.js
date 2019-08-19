const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

// const books = [
//   {
//     id: 1,
//     title: "My First Blog Post",
//     author: "Andrew Chalkley",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu fermentum metus. Sed blandit at sapien sed porttitor. Curabitur libero velit, blandit vel est ut, cursus aliquam augue. Vivamus aliquam, lorem id lobortis blandit, sem quam gravida nibh, a pulvinar nulla lacus eget tortor. Suspendisse cursus, eros non auctor interdum, quam metus sollicitudin est, nec consequat massa nisi sed purus. Aliquam pellentesque sagittis risus vitae porttitor. In dignissim, enim eget pulvinar semper, magna justo vulputate justo, vitae volutpat sapien dolor eget arcu. Mauris ornare ipsum in est molestie pretium. Pellentesque at nulla at libero sagittis condimentum. Pellentesque tempor quis neque eget aliquam. Curabitur facilisis ultricies erat quis sagittis. Sed eu malesuada neque. Donec tempor dignissim urna, eu efficitur felis porttitor quis.",
//     // publishedAt: publishedAt,
//     shortDescription: shortDescription
//   },
//   {
//     id: 2,
//     title: "My Second Blog Post",
//     author: "Andrew Chalkley",
//     body: "Lorem ipsum dolor sit amet, adipiscing elit. Sed eu fermentum metus. Sed blandit at sapien sed porttitor. Curabitur libero velit, blandit vel est ut, cursus aliquam augue. Vivamus aliquam, lorem id lobortis blandit, sem quam gravida nibh, a pulvinar nulla lacus eget tortor. Suspendisse cursus, eros non auctor interdum, quam metus sollicitudin est, nec consequat massa nisi sed purus. Aliquam pellentesque sagittis risus vitae porttitor. In dignissim, enim eget pulvinar semper, magna justo vulputate justo, vitae volutpat sapien dolor eget arcu. Mauris ornare ipsum in est molestie pretium. Pellentesque at nulla at libero sagittis condimentum. Pellentesque tempor quis neque eget aliquam. Curabitur facilisis ultricies erat quis sagittis. Sed eu malesuada neque. Donec tempor dignissim urna, eu efficitur felis porttitor quis.",
//     // publishedAt: publishedAt,
//     shortDescription: shortDescription
//   }
// ];


// function find(id) {
//   const matchedBooks = books.filter(function(book) { return book.id == id; });
//   return matchedBooks[0];
// }


/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["title", "ASC"]]}).then(function(books){
    console.log("Start: Render index of books");
    res.render("index", { books, title: "Maliha's Awesome Library" });
    console.log("End: Render index of books");
  }).catch(function(err){
    err.statusCode = err.statusCode || 500;
    throw err;
    // res.send(500);
  });
});

/* POST create book. */
router.post('/', function(req, res, next) {
  Book.create(req.body).then(function(book){
    res.redirect("/books/" + book.id);
  }).catch(function(err){
    if(err.name === 'SequelizeValidationError') {
      res.render("books/new", {
        book: Book.build(req.body), 
        title: "New Book",
        errors: err.errors
      });

    } else {
      throw err;
    }
  }).catch(function(err){
    res.send(500);
  });
});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("books/new", {book: Book.build(), title: "New Book"});
});

/* Edit book form. */
router.get('/:id/edit', function (req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    if (book) {
      res.render('books/edit', { book: book, title: 'Edit Book' });
    } else {
      res.send(404);
    }
  }).catch(function(err){
    res.send(500);
  });
});
// router.get("/:id/edit", function(req, res, next){
//   const book = find(req.params.id);  

//   res.render("books/edit", {book: book, title: "Edit Book"});
// });


/* Delete book form. */
router.get('/:id/delete', function (req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    if (book) {
      res.render('books/delete', { book: book, title: 'Delete Book' });
    } else {
      res.send(404);
    }
  }).catch(function(err){
    res.send(500);
  });
});

// router.get("/:id/delete", function(req, res, next){
//   const book = find(req.params.id);  
  
//   res.render("books/delete", {book: book, title: "Delete Book"});
// });


/* GET individual book. */
router.get('/:id', function(req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    if (book) {
      res.render('books/show', { book: book, title: book.title });
    } else {
      res.send(404);
    }
  }).catch(function(err){
    res.send(500);
  });
});
// router.get("/:id", function(req, res, next){
//   Book.findById(req.params.id).then(function(book) {
//     res.render("books/show", {book: book, title: book.title});
//   });
// });

/* PUT update book. */
//update method is returning a promise passes the next value down the then chain.
router.put('/:id', function (req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    if (book) {
      return book.update(req.body);
    } else {
      res.send(404);
    }
  }).then((book) => {
    res.redirect('/books/' + book.id);
  }).catch(function(err){
    if(err.name === 'SequelizeValidationError') {
      const book = Book.build(req.body);
      book.id = req.params.id;

      res.render("books/edit", {
        book: book, 
        title: "Edit Book",
        errors: err.errors
      });
    } else {
      throw err;
    }
  }).catch(function(err){
    res.send(500);
  });
});
// router.put("/:id", function(req, res, next){
//   const book = find(req.params.id);
//   book.title = req.body.title;
//   book.body = req.body.body;
//   book.author = req.body.author;
  
//   res.redirect("/books/" + book.id);    
// });

/* DELETE individual book. */
//destroy method returns a promise. once the promise is fulfilled, then we redirect to the books path.
router.delete('/:id', function (req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    if (book) {
      return book.destroy();
    } else {
      res.send(404);
    }
  }).then(() => {
    res.redirect('/books');
  }).catch(function(err){
    res.send(500);
  });
});
// router.delete("/:id", function(req, res, next){
//   const book = find(req.params.id);  
//   const index = books.indexOf(book);
//   books.splice(index, 1);

//   res.redirect("/books");
// });


module.exports = router;
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