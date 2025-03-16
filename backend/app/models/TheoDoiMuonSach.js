const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MADOCGIA: { type: mongoose.Schema.Types.ObjectId, ref: "DocGia" , required: true },
  MASACH: { type: mongoose.Schema.Types.ObjectId, ref: "Sach", required: true },
  NGAYMUON: { type: Date, default: Date.now },
  NGAYTRA: { type: Date, default: null, required: false },
  TRANGTHAI: { type: String, enum: ["Chờ duyệt", "Đang mượn", "Đã trả"], default: "Chờ duyệt"},
  SOQUYEN:  { type: Number, required: true, min: 1 }
});

const TheoDoiMuonSach = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);

module.exports = TheoDoiMuonSach;