const NhanVien = require("../models/NhanVien");
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs");

// Lấy tất cả nhân viên
exports.getAllNhanVien = async () => {
  const nhanViens = await NhanVien.find();
  if (!nhanViens || nhanViens.length === 0) {
    throw new ApiError(404, "Không tìm thấy nhân viên nào");
  }
  return nhanViens;
};

// Lấy nhân viên theo ID
exports.getNhanVienById = async (id) => {
  const nhanVien = await NhanVien.findById(id);
  if (!nhanVien) {
    throw new ApiError(404, "Không tìm thấy nhân viên");
  }
  return nhanVien;
};

// Tạo nhân viên mới
exports.createNhanVien = async (data) => {
  try {
    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(data.PASSWORD, 10);
    data.PASSWORD = hashedPassword;

    const newNhanVien = new NhanVien(data);
    return await newNhanVien.save();
  } catch (error) {
    throw new ApiError(400, "Dữ liệu nhân viên không hợp lệ");
  }
};

// Cập nhật thông tin nhân viên
exports.updateNhanVien = async (id, data) => {
  if (data.PASSWORD) {
    data.PASSWORD = await bcrypt.hash(data.PASSWORD, 10);
  }

  const updatedNhanVien = await NhanVien.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedNhanVien) {
    throw new ApiError(404, "Không tìm thấy nhân viên để cập nhật");
  }
  return updatedNhanVien;
};

// Xóa nhân viên
exports.deleteNhanVien = async (id) => {
  const deletedNhanVien = await NhanVien.findByIdAndDelete(id);
  if (!deletedNhanVien) {
    throw new ApiError(404, "Không tìm thấy nhân viên để xóa");
  }
  return deletedNhanVien;
};

const timTheoSDT = async (sdt) => {
    return await NhanVien.findOne({ sdt });
};

module.exports = { timTheoSDT };
