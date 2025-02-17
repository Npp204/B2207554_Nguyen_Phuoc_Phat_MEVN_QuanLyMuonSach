const sachService = require('../services/sach.service');
const ApiError = require('../api-error');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await sachService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await sachService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await sachService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updatedBook = await sachService.updateBook(req.params.id, req.body);
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await sachService.deleteBook(req.params.id);
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};
