const ApiError = require("../api-error");
const NhanVien = require("../models/NhanVien");
const DocGia = require("../models/DocGia");

// Middleware kiểm tra vai trò người dùng
const authMiddleware = async (req, res, next) => {
    try {
        const { sdt } = req.body; // Nhận số điện thoại từ request

        if (!sdt) {
            return next(new ApiError(400, "Số điện thoại là bắt buộc"));
        }

        // Kiểm tra trong bảng nhân viên
        const nhanVien = await NhanVien.findOne({ SDT: sdt });
        if (nhanVien) {
            req.user = { role: "nhanvien", info: nhanVien };
            return next(); // Cho phép tiếp tục
        }

        // Kiểm tra trong bảng độc giả
        let docGia = await DocGia.findOne({ SDT: sdt });
        if (!docGia) {
            // Nếu không có độc giả, tạo mới
            docGia = new DocGia({ SDT: sdt, HOTEN: "Chưa cập nhật" });
            await docGia.save();
        }
        
        req.user = { role: "docgia", info: docGia };
        return next(); // Tiếp tục xử lý request

    } catch (error) {
        next(new ApiError(500, "Lỗi xác thực người dùng"));
    }
};

// Middleware kiểm tra quyền nhân viên
const requireNhanVien = (req, res, next) => {
    if (req.user && req.user.role === "nhanvien") {
        return next();
    }
    return next(new ApiError(403, "Bạn không có quyền truy cập"));
};

module.exports = { authMiddleware, requireNhanVien };
