const ApiError = require("../api-error");

// Middleware kiểm tra chức vụ nhân viên
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== "nhanvien") {
            return next(new ApiError(403, "Bạn không có quyền truy cập"));
        }

        // Kiểm tra chức vụ nhân viên có trong danh sách cho phép không
        if (!allowedRoles.includes(req.user.info.CHUCVU)) {
            return next(new ApiError(403, "Bạn không đủ quyền hạn để truy cập"));
        }

        next(); // Nếu hợp lệ, tiếp tục xử lý
    };
};

module.exports = { requireRole };
