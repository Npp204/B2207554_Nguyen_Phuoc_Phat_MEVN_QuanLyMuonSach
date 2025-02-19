const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema({
  MANXB: { type: String, required: true, unique: true },
  TENNXB: { type: String, required: true },
  DIACHI: { type: String },
});

const NhaXuatBan = mongoose.model("NhaXuatBan", NhaXuatBanSchema);

module.exports = NhaXuatBan;