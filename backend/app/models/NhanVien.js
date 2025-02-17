const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema({
  MSNV: { type: String, required: true, unique: true },
  HOTENNV: { type: String, required: true },
  PASSWORD: { type: String, required: true },
  CHUCVU: { type: String, enum: ["QuanTriVien", "NhanVienThuVien"], default: "NhanVienThuVien" },
  DIACHI: { type: String },
  SODIENTHOAI: { type: String },
});

const NhanVien = mongoose.model("NhanVien", NhanVienSchema);

module.exports = NhanVien;