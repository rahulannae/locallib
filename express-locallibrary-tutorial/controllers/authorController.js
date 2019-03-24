var Author = require('../models/author');
var Book = require('../models/book');

var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.authorList = (req, res) => {
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('author_list', { title: 'Author List', author_list: list_authors });
        });
}
exports.authorDetail = (req, res) => {
    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id, callback);
        },
        authors_books: function (callback) {
            Book.find({ author: req.params.id }, 'title summary', callback)
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.author == null) {
            let x = new Error('Author not found');
            x.status = 404;
            return next(x);
        }
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });
}
exports.authorCreateGet = (req, res) => {
    res.render('author_form', { title: 'Create Author'});
}
exports.authorCreate = (req, res) => {
    [

        // Validate fields.
        body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
            .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
        body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
            .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
        body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
        body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),
    
        // Sanitize fields.
        sanitizeBody('first_name').escape(),
        sanitizeBody('family_name').escape(),
        sanitizeBody('date_of_birth').toDate(),
        sanitizeBody('date_of_death').toDate(),
    
        // Process request after validation and sanitization.
        (req, res, next) => {
    
            // Extract the validation errors from a request.
            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
                return;
            }
            else {
                // Data from form is valid.
    
                // Create an Author object with escaped and trimmed data.
                var author = new Author(
                    {
                        first_name: req.body.first_name,
                        family_name: req.body.family_name,
                        date_of_birth: req.body.date_of_birth,
                        date_of_death: req.body.date_of_death
                    });
                author.save(function (err) {
                    if (err) { return next(err); }
                    // Successful - redirect to new author record.
                    res.redirect(author.url);
                });
            }
        }
    ];
}
exports.authorDeleteGet = (req, res) => {
    res.send('NOT IMPLEMENTED: AUTH Delete FORM');
}
exports.authorDelete = (req, res) => {
    res.send('NOT IMPLEMENTED: AUTH Delete');
}
exports.authorUpdateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: AUTH Update FORM');
}
exports.authorUpdate = (req, res) => {
    res.send('NOT IMPLEMENTED: AUTH Update');
}