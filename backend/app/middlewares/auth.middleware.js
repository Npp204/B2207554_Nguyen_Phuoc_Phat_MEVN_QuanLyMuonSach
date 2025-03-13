const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
const NhanVien = require("../models/NhanVien");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return next(new ApiError(401, "Bạn chưa đăng nhập!"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào req
        next();
    } catch (error) {
        next(new ApiError(403, "Token không hợp lệ!"));
    }
};

// Kiểm tra nếu user là "QuanLyThuVien"
const isQuanLyThuVien = async (req, res, next) => {
    try {
        const nhanVien = await NhanVien.findById(req.user.id);

        if (!nhanVien || nhanVien.CHUCVU !== "QuanLyThuVien") {
            return next(new ApiError(403, "Bạn không có quyền truy cập!"));
        }

        next(); // Cho phép truy cập tiếp
    } catch (error) {
        next(new ApiError(500, "Lỗi máy chủ!"));
    }
};

module.exports = { verifyToken, isQuanLyThuVien };
