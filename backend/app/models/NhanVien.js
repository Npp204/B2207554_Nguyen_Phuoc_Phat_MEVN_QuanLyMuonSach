const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema({
  MANV: { type: String, required: true, unique: true },
  HOTENNV: { type: String, required: true },
  PASSWORD: { type: String, required: true },
  CHUCVU: { type: String, enum: ["QuanLyThuVien", "NhanVienThuVien"], default: "NhanVienThuVien" },
  DIACHI: { type: String },
  SODIENTHOAI: { type: String , required: true, unique: true },
});

const NhanVien = mongoose.model("NhanVien", NhanVienSchema);

module.exports = NhanVien;