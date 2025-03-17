const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
const NhanVien = require("../models/NhanVien");
const config = require("../config");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Bạn chưa đăng nhập!"));
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(403, "Token không hợp lệ!"));
    }
};

// Kiểm tra nếu user là "QuanLyThuVien"
const isQuanLyThuVien = async (req, res, next) => {
    try {
        const nhanVien = await NhanVien.findById(req.user.id).select("CHUCVU");

        if (!nhanVien) {
            return next(new ApiError(404, "Nhân viên không tồn tại!"));
        }

        if (nhanVien.CHUCVU !== "QuanLyThuVien") {
            return next(new ApiError(403, "Bạn không có quyền truy cập!"));
        }

        next(); // Cho phép truy cập tiếp
    } catch (error) {
        return next(new ApiError(500, "Lỗi máy chủ!"));
    }
};

module.exports = { verifyToken, isQuanLyThuVien };
