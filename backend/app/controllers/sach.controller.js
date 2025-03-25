const sachService = require('../services/sach.service');
const ApiError = require('../api-error');

exports.getAllSach = async (req, res, next) => {
  try {
    const sachs = await sachService.getAllSach();
    res.status(200).json(sachs);
  } catch (error) {
    next(error);
  }
};

exports.getSachById = async (req, res, next) => {
  try {
    const sach = await sachService.getSachById(req.params.id);
    res.status(200).json(sach);
  } catch (error) {
    next(error);
  }
};

exports.createSach = async (req, res, next) => {
  try {
    let sachData = req.body;
  
    if (req.file) {
      sachData.HINHANH = `/uploads/sach/${req.file.filename}`;
    }
    const newSach = await sachService.createSach(sachData);
    res.status(201).json(newSach);
  } catch (error) {
    next(error);
  }
};

exports.updateSach = async (req, res, next) => {
  try {
    let sachData = req.body;

    if (req.file) {
      sachData.HINHANH = `/uploads/sach/${req.file.filename}`;
    }

    const updatedSach = await sachService.updateSach(req.params.id, sachData);
    res.status(200).json(updatedSach);  // Fix lỗi 'updatedBook' -> 'updatedSach'
  } catch (error) {
    next(error);
  }
};

exports.deleteSach = async (req, res, next) => {
  try {
    const deletedSach = await sachService.deleteSach(req.params.id);
    res.status(200).json({ message: "Đã xóa sách thành công", deletedSach });
  } catch (error) {
    next(error);
  }
};
