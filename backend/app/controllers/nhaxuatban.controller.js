const nhaXuatBanService = require("../services/nhaxuatban.service");
const ApiError = require("../api-error");

// Lấy tất cả nhà xuất bản
exports.getAllNhaXuatBan = async (req, res, next) => {
  try {
    const nhaxuatbans = await nhaXuatBanService.getAllNhaXuatBan();
    res.status(200).json(nhaxuatbans);
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin nhà xuất bản theo ID
exports.getNhaXuatBanById = async (req, res, next) => {
  try {
    const nhaxuatban = await nhaXuatBanService.getNhaXuatBanById(req.params.id);
    if (!nhaxuatban) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    res.status(200).json(nhaxuatban);
  } catch (error) {
    next(error);
  }
};

// Tạo mới nhà xuất bản
exports.createNhaXuatBan = async (req, res, next) => {
  try {
    const nhaxuatban = await nhaXuatBanService.createNhaXuatBan(req.body);
    res.status(201).json(nhaxuatban);
  } catch (error) {
    next(error);
  }
};

// Cập nhật nhà xuất bản
exports.updateNhaXuatBan = async (req, res, next) => {
  try {
    const nhaxuatban = await nhaXuatBanService.updateNhaXuatBan(req.params.id, req.body);
    if (!nhaxuatban) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    res.status(200).json({ message: "Đã cập nhật nhà xuất bản thành công", nhaxuatban });
  } catch (error) {
    next(error);
  }
};

// Xóa nhà xuất bản
exports.deleteNhaXuatBan = async (req, res, next) => {
  try {
    const result = await nhaXuatBanService.deleteNhaXuatBan(req.params.id);
    if (!result) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    res.status(200).json({ message: "Đã xóa nhà xuất bản thành công", result });
  } catch (error) {
    next(error);
  }
};



