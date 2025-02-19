const NhaXuatBan = require("../models/NhaXuatBan");

class NhaXuatBanService {
  // Lấy danh sách tất cả nhà xuất bản
  static async getAll() {
    return await NhaXuatBan.find();
  }

  // Tìm nhà xuất bản theo ID
  static async getById(id) {
    return await NhaXuatBan.findById(id);
  }

  // Tạo mới nhà xuất bản
  static async create(data) {
    return await NhaXuatBan.create(data);
  }

  // Cập nhật nhà xuất bản theo ID
  static async update(id, data) {
    return await NhaXuatBan.findByIdAndUpdate(id, data, { new: true });
  }

  // Xóa nhà xuất bản theo ID
  static async delete(id) {
    return await NhaXuatBan.findByIdAndDelete(id);
  }
}

module.exports = NhaXuatBanService;
