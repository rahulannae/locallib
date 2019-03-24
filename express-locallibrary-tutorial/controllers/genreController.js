var Genre = require('../models/genre');
var Book = require('../models/book');

var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.genreList = (req, res) => {
    Genre.find({})
        .sort([['name', 'ascending']])
        .exec(function (err, genres) {
            if (err) {
                return next(err);
            }
            res.render('genre_list', { title: 'Genre List', genre_list: genres });
        });
}
exports.genreDetail = (req, res) => {
    async.parallel({
        genre: function (callback) {
            console.log(callback);
            Genre.findById(req.params.id)
                .exec(callback)
        },
        genre_books: function (callback) {
            Book.find({ genre: req.params.id })
                .exec(callback)
        }
    },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.genre == null) {
                let x = new Error('Genre not found');
                x.status = 404;
                return next(x);
            }
            res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
        }
    )
}
exports.genreCreateGet = (req, res) => {
    res.render('genre_form', { title: 'Create Genre' });
}
exports.genreCreate = [

    // Validate that the name field is not empty.
    body('name', 'Genre name required').isLength({ min: 1 }).trim(),
    // Sanitize (escape) the name field.
    sanitizeBody('name').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a genre object with escaped and trimmed data.
        console.log(req.body);
        var genre = new Genre(
            { name: req.body.name }
        );
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findOne({ 'name': req.body.name })
                .exec(function (err, found_genre) {
                    if (err) {
                        return next(err);
                    }
                    if (found_genre) {
                        // Genre exists, redirect to its detail page.
                        res.redirect(found_genre.url);
                    }
                    else {
                        genre.save(function (err) {
                            if (err) { return next(err); }
                            // Genre saved. Redirect to genre detail page.
                            res.redirect(genre.url);
                        });
                    }
                });
        }
    }
];
exports.genreDeleteGet = (req, res) => {
    res.send('NOT IMPLEMENTED: GENRE Delete FORM');
}
exports.genreDelete = (req, res) => {
    res.send('NOT IMPLEMENTED: GENRE Delete');
}
exports.genreUpdateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: GENRE Update FORM');
}
exports.genreUpdate = (req, res) => {
    res.send('NOT IMPLEMENTED: GENRE Update');
}