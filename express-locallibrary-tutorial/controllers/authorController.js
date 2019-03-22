var Author = require('../models/author');

exports.authorList = (req, res) => {
    res.send('NOT IMPLEMENTED: AUTH LIST');
}
exports.authorDetail = (req, res) => {
    res.send(`NOT IMPLEMENTED: AUTH BY ID: ${req.params.id}`);
}
exports.authorCreateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: AUTH CREATE FORM');
}
exports.authorCreate = (req, res) => {
    res.send('NOT IMPLEMENTED: AUTH CREATE');
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