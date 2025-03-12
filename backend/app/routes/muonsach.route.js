const express = require("express");
const router = express.Router();
const muonSachController = require("../controllers/muonsach.controller");
const { requireNhanVien } = require("../middlewares/auth.middleware");

// Độc giả đăng ký mượn sách
router.post("/muon", muonSachController.dangKyMuonSach);

// Nhân viên duyệt mượn sách
router.put("/duyet/:id", requireNhanVien, muonSachController.duyetMuonSach);

// Nhân viên xác nhận trả sách
router.put("/tra/:id", requireNhanVien, muonSachController.xacNhanTraSach);

module.exports = router;
