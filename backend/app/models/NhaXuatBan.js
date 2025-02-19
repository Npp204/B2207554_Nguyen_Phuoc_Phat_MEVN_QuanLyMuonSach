const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema({
  MANG: { type: String, required: true, unique: true },
  TENNG: { type: String, required: true },
  DIACHI: { type: String },
});

const NhaXuatBan = mongoose.model("NhaXuatBan", NhaXuatBanSchema);

module.exports = NhaXuatBan;