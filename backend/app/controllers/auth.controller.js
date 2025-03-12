const authService = require("../services/auth.service");

const loginNhanVien = async (req, res, next) => {
    try {
        const { sdt, password } = req.body;
        const result = await authService.loginNhanVien(sdt, password);
        return res.json({ message: "Đăng nhập thành công", ...result });
    } catch (error) {
        next(error);
    }
};

const loginDocGia = async (req, res, next) => {
    try {
        const { sdt, password } = req.body;
        const result = await authService.loginDocGia(sdt, password);
        return res.json({ message: "Đăng nhập thành công", ...result });
    } catch (error) {
        next(error);
    }
};

const registerDocGia = async (req, res, next) => {
    try {
        const { sdt, password, confirmPassword } = req.body;
        const result = await authService.registerDocGia(sdt, password, confirmPassword);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = { loginNhanVien, loginDocGia, registerDocGia };
