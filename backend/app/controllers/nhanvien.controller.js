const nhanVienService = require("../services/nhanvien.service");
const ApiError = require("../api-error");

exports.getAllNhanVien = async (req, res, next) => {
  try {
    const nhanViens = await nhanVienService.getAllNhanVien();
    return res.json(nhanViens);
  } catch (error) {
    next(error);
  }
};

exports.getNhanVienById = async (req, res, next) => {
  try {
    const nhanVien = await nhanVienService.getNhanVienById(req.params.id);
    res.status(200).json(nhanVien);
  } catch (error) {
    next(error);
  }
};

exports.createNhanVien = async (req, res, next) => {
  try {
    const newNhanVien = await nhanVienService.createNhanVien(req.body);
    res.status(201).json(newNhanVien);
  } catch (error) {
    next(error);
  }
};

exports.updateNhanVien = async (req, res, next) => {
  try {
    const updatedNhanVien = await nhanVienService.updateNhanVien(req.params.id, req.body);
    res.status(200).json(updatedNhanVien);
  } catch (error) {
    next(error);
  }
};

exports.deleteNhanVien = async (req, res, next) => {
  try {
    const deletedNhanVien = await nhanVienService.deleteNhanVien(req.params.id);
    res.status(200).json({ message: "Đã xóa nhân viên thành công", deletedNhanVien });
  } catch (error) {
    next(error);
  }
};
