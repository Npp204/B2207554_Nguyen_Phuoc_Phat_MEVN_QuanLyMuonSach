const Sach = require('../models/Sach');
const ApiError = require('../api-error');

// Lấy tất cả sách
exports.getAllBooks = async () => {
  const books = await Sach.find();
  if (!books || books.length === 0) {
    throw new ApiError(404, 'Không tìm thấy sách nào');
  }
  return books;
};

// Lấy sách theo ID
exports.getBookById = async (id) => {
  const book = await Sach.findById(id);
  if (!book) {
    throw new ApiError(404, 'Không tìm thấy sách');
  }
  return book;
};

// Tạo sách mới
exports.createBook = async (bookData) => {
  const newBook = new Sach(bookData);
  try {
    return await newBook.save();
  } catch (error) {
    console.error("Lỗi khi tạo sách:", error);
    throw new ApiError(400, 'Dữ liệu sách không hợp lệ');
  }
};

// Cập nhật sách
exports.updateBook = async (id, bookData) => {
  const updatedBook = await Sach.findByIdAndUpdate(id, bookData, { new: true, runValidators: true });
  if (!updatedBook) {
    throw new ApiError(404, 'Không tìm thấy sách để cập nhật');
  }
  return updatedBook;
};

// Xóa sách
exports.deleteBook = async (id) => {
  const deletedBook = await Sach.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new ApiError(404, 'Không tìm thấy sách để xóa');
  }
  return deletedBook;
};
