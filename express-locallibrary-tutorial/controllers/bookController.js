var Genre = require('../models/book');

exports.index = (req, res) => {
    res.send('NO HOME PAGE YET');
}
exports.bookList = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOK LIST');
}
exports.bookDetail = (req, res) => {
    res.send(`NOT IMPLEMENTED: BOOK BY ID: ${req.params.id}`);
}
exports.bookCreateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOK CREATE FORM');
}
exports.bookCreate = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOK CREATE');
}
exports.bookDeleteGet = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOK Delete FORM');
}
exports.bookDelete = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOK Delete');
}
exports.bookUpdateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOK Update FORM');
}
exports.bookUpdate = (req, res) => {
    res.send('NOT IMPLEMENTED: BOOK Update');
}