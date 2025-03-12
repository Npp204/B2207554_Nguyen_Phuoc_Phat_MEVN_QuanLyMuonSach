const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login/nhanvien", authController.loginNhanVien);
router.post("/login/docgia", authController.loginDocGia);
router.post("/register/docgia", authController.registerDocGia); 

module.exports = router;
