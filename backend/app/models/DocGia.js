const mongoose = require("mongoose");

const DocGiaSchema = new mongoose.Schema({
  MADOCGIA: { type: String, required: true, unique: true },
  HOLOT: { type: String },
  TEN: { type: String, required: true },
  NGAYSINH: { type: Date },
  PHAI: { type: String, enum: ["Nam", "Nữ"] },
  DIACHI: { String },
  SODIENTHOAI: { type: String },
});

const DocGia = mongoose.model("DocGia", DocGiaSchema);

module.exports = DocGia;