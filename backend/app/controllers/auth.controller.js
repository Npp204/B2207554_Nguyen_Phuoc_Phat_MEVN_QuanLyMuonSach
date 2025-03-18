const authService = require("../services/auth.service");

exports.loginNhanVien = async (req, res, next) => {
    try {
        const { sdt, password } = req.body;
        const result = await authService.loginNhanVien(sdt, password);
        return res.json({ message: "Đăng nhập thành công", ...result });
    } catch (error) {
        next(error);
    }
};

exports.loginDocGia = async (req, res, next) => {
    try {
        const { sdt, password } = req.body;
        const result = await authService.loginDocGia(sdt, password);
        return res.json({ message: "Đăng nhập thành công", ...result });
    } catch (error) {
        next(error);
    }
};

exports.registerDocGia = async (req, res, next) => {
    try {
        const { sdt, password, confirmPassword } = req.body;
        const result = await authService.registerDocGia(sdt, password, confirmPassword);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

exports.registerNhanVien = async (req, res, next) => {
    try {   
        //console.log("Dữ liệu nhận được",req.body);
        const { HOTENNV, SODIENTHOAI, PASSWORD, CHUCVU } = req.body;
        //console.log(HOTENNV, SODIENTHOAI, PASSWORD, CHUCVU);
        const result = await authService.registerNhanVien( HOTENNV, SODIENTHOAI, PASSWORD, CHUCVU);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}