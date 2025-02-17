const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MADOCGIA: { type: mongoose.Schema.Types.ObjectId, ref: "DocGia" , required: true },
  MASACH: { type: mongoose.Schema.Types.ObjectId, ref: "Sach", required: true },
  NGAYMUON: { type: Date, default: Date.now },
  NGAYTRA: { type: Date },
});

const TheoDoiMuonSach = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);

module.exports = TheoDoiMuonSach;