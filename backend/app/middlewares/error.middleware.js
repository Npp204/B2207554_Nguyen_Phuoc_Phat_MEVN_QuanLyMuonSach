const ApiError = require("../api-error");

// Middleware xử lý lỗi 404 (Không tìm thấy route)
const notFoundHandler = (req, res, next) => {
    //Code ở đây sẽ chạy khi không có route được định nhĩa nào
    //khớp với yêu cầu. Gọi nex() để chuyển đến middleware xử lý lỗi
    next(new ApiError(404, "Resource not found"));
};

// Middleware xử lý lỗi tập trung
const errorHandler = (err, req, res, next) => {
    //Middleware xử lý lỗi tập trung.
    //Trong các đoạn xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
};

module.exports = { errorHandler, notFoundHandler };
