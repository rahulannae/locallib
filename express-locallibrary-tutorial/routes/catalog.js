var express = require('express');

var router = express.Router();

var bookController = require('../controllers/bookController');
var authorController = require('../controllers/authorController');
var bookInstanceController = require('../controllers/bookInstanceController');
var genreController = require('../controllers/genreController');

router.get('/', bookController.index);

router.get('/books', bookController.bookList);

router.get('/book/create', bookController.bookCreateGet);

router.post('/book/create', bookController.bookCreate);

router.get('/book/delete', bookController.bookDeleteGet);

router.post('/book/delete', bookController.bookDelete);

router.get('/book/update', bookController.bookUpdateGet);

router.post('/book/update', bookController.bookUpdate);

router.get('/book/:id', bookController.bookDetail);
//author routes
router.get('/authors', authorController.authorList);

router.get('/author/create', authorController.authorCreateGet);

router.post('/author/create', authorController.authorCreate);

router.get('/author/delete', authorController.authorDeleteGet);

router.post('/author/delete', authorController.authorDelete);

router.get('/author/update', authorController.authorUpdateGet);

router.post('/author/update', authorController.authorUpdate);

router.get('/author/:id', authorController.authorDetail);
//bookinstance routes
router.get('/bookInstances', bookInstanceController.bookInstanceList);

router.get('/bookInstance/create', bookInstanceController.bookInstanceCreateGet);

router.post('/bookInstance/create', bookInstanceController.bookInstanceCreate);

router.get('/bookInstance/delete', bookInstanceController.bookInstanceDeleteGet);

router.post('/bookInstance/delete', bookInstanceController.bookInstanceDelete);

router.get('/bookInstance/update', bookInstanceController.bookInstanceUpdateGet);

router.post('/bookInstance/update', bookInstanceController.bookInstanceUpdate);

router.get('/bookInstance/:id', bookInstanceController.bookInstanceDetail);
//genre routes
router.get('/genres', genreController.genreList);

router.get('/genre/create', genreController.genreCreateGet);

router.post('/genre/create', genreController.genreCreate);

router.get('/genre/delete', genreController.genreDeleteGet);

router.post('/genre/delete', genreController.genreDelete);

router.get('/genre/update', genreController.genreUpdateGet);

router.post('/genre/update', genreController.genreUpdate);

router.get('/genre/:id', genreController.genreDetail);

module.exports = router;
