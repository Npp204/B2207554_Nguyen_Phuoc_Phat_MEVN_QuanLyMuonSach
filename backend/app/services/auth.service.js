const nhanVienService = require("../services/nhanvien.service");
const docGiaService = require("../services/docgia.service");
const ApiError = require("../api-error");

// Đăng nhập nhân viên
const loginNhanVien = async (sdt, password) => {
    if (!sdt || !password) {
        throw new ApiError(400, "Số điện thoại và mật khẩu là bắt buộc");
    }

    const nhanVien = await nhanVienService.timTheoSDT(sdt);
    if (!nhanVien || nhanVien.PASSWORD !== password) {
        throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    }

    return { role: "nhanvien", user: nhanVien };
};

// Đăng nhập độc giả
const loginDocGia = async (sdt, password) => {
    if (!sdt || !password) {
        throw new ApiError(400, "Số điện thoại và mật khẩu là bắt buộc");
    }

    const docGia = await docGiaService.timTheoSDT(sdt);
    if (!docGia || docGia.PASSWORD !== password) {
        throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    }

    return { role: "docgia", user: docGia };
};

// Đăng ký độc giả
const registerDocGia = async (sdt, password, confirmPassword) => {
    if (!sdt || !password || !confirmPassword) {
        throw new ApiError(400, "Số điện thoại, mật khẩu và xác nhận mật khẩu là bắt buộc");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Mật khẩu xác nhận không khớp");
    }

    // Kiểm tra số điện thoại đã tồn tại chưa
    const existingDocGia = await docGiaService.timTheoSDT(sdt);
    if (existingDocGia) {
        throw new ApiError(400, "Số điện thoại đã được đăng ký");
    }

    // Tạo độc giả mới
    const newDocGia = await docGiaService.taoMoi({ SODIENTHOAI: sdt, PASSWORD: password });

    return { message: "Đăng ký thành công", user: newDocGia };
};

module.exports = { loginNhanVien, loginDocGia, registerDocGia };
