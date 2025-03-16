const express = require("express");
const router = express.Router();
const muonSachController = require("../controllers/muonsach.controller");
const { requireNhanVien } = require("../middlewares/auth.middleware");

router.post("/dangky", muonSachController.dangKyMuonSach);

router.put("/duyet/:id", muonSachController.duyetMuonSach);

router.put("/tra/:id", muonSachController.xacNhanTraSach);

module.exports = router;
