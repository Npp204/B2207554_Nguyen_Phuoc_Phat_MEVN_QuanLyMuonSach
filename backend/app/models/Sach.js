const mongoose = require("mongoose");

const SachSchema = new mongoose.Schema({
  MASACH: { type: String, required: true, unique: true },
  TENSACH: { type: String, required: true },
  DONGIA: { type: Number, required: true },
  SOQUYEN: { type: Number, default: 0 },
  NAMXUATBAN: { type: Number },
  MANXB: { type: mongoose.Schema.Types.ObjectId, ref: "NhaXuatBan" },
  NGUONGOC_TACGIA: { type: String },
});

const Sach = mongoose.model("Sach", SachSchema);

module.exports = Sach;