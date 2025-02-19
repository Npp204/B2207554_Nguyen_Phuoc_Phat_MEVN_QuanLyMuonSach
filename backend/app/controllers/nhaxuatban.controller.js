const NhaXuatBanService = require("../services/nhaxuatban.service");

class NhaXuatBanController {
  // Lấy tất cả nhà xuất bản
  static async getAll(req, res, next) {
    try {
      const nhaxuatbans = await NhaXuatBanService.getAll();
      res.json(nhaxuatbans);
    } catch (error) {
      next(error);
    }
  }

  // Lấy thông tin nhà xuất bản theo ID
  static async getById(req, res, next) {
    try {
      const nhaxuatban = await NhaXuatBanService.getById(req.params.id);
      if (!nhaxuatban) return res.status(404).json({ message: "Không tìm thấy" });
      res.json(nhaxuatban);
    } catch (error) {
      next(error);
    }
  }

  // Tạo mới nhà xuất bản
  static async create(req, res, next) {
    try {
      const nhaxuatban = await NhaXuatBanService.create(req.body);
      res.status(201).json(nhaxuatban);
    } catch (error) {
      next(error);
    }
  }

  // Cập nhật nhà xuất bản
  static async update(req, res, next) {
    try {
      const nhaxuatban = await NhaXuatBanService.update(req.params.id, req.body);
      if (!nhaxuatban) return res.status(404).json({ message: "Không tìm thấy" });
      res.json(nhaxuatban);
    } catch (error) {
      next(error);
    }
  }

  // Xóa nhà xuất bản
  static async delete(req, res, next) {
    try {
      const result = await NhaXuatBanService.delete(req.params.id);
      if (!result) return res.status(404).json({ message: "Không tìm thấy" });
      res.json({ message: "Đã xóa thành công" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NhaXuatBanController;
