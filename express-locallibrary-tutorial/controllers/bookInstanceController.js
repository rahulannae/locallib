var BookInstance = require('../models/bookinstance');

exports.bookInstanceList = (req, res) => {
    BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });
}
exports.bookInstanceDetail = function(req, res, next) {

        BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookinstance) {
          if (err) { return next(err); }
          if (bookinstance==null) { // No results.
              var err = new Error('Book copy not found');
              err.status = 404;
              return next(err);
            }
          // Successful, so render.
          res.render('bookinstance_detail', { title: 'Book:', bookinstance:  bookinstance});
        })
    
    };
    
exports.bookInstanceCreateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOKINSTANCE CREATE FORM');
}
exports.bookInstanceCreate = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOKINSTANCE CREATE');
}
exports.bookInstanceDeleteGet = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOKINSTANCE Delete FORM');
}
exports.bookInstanceDelete = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOKINSTANCE Delete');
}
exports.bookInstanceUpdateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOKINSTANCE Update FORM');
}
exports.bookInstanceUpdate = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOKINSTANCE Update');
}