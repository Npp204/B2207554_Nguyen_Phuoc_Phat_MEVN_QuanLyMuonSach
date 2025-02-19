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
    const newSach = await sachService.createSach(req.body);
    res.status(201).json(newSach);
  } catch (error) {
    next(error);
  }
};

exports.updateSach = async (req, res, next) => {
  try {
    const updatedSach = await sachService.updateSach(req.params.id, req.body);
    res.status(200).json(updatedBook);
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
