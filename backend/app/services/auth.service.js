const NhanVien = require("../models/NhanVien");
const DocGia = require("../models/DocGia");
const ApiError = require("../api-error");

// Đăng nhập nhân viên
exports.loginNhanVien = async (sdt, password) => {
    if (!sdt || !password) {
        throw new ApiError(400, "Số điện thoại và mật khẩu là bắt buộc");
    }

    const nhanVien = await NhanVien.findOne({ SODIENTHOAI: sdt });

    if (!nhanVien || nhanVien.PASSWORD !== password) {
        throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    }

    return { role: "nhanvien", user: nhanVien };
};

// Đăng nhập độc giả
exports.loginDocGia = async (sdt, password) => {
    if (!sdt || !password) {
        throw new ApiError(400, "Số điện thoại và mật khẩu là bắt buộc");
    }

    const docGia = await DocGia.findOne({ SODIENTHOAI: sdt });

    if (!docGia || docGia.PASSWORD !== password) {
        throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    }

    return { role: "docgia", user: docGia };
};

// Đăng ký độc giả
exports.registerDocGia = async (sdt, password, confirmPassword) => {
    if (!sdt || !password || !confirmPassword) {
        throw new ApiError(400, "Số điện thoại, mật khẩu và xác nhận mật khẩu là bắt buộc");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Mật khẩu xác nhận không khớp");
    }

    const existingDocGia = await DocGia.findOne({ SODIENTHOAI: sdt });

    if (existingDocGia) {
        throw new ApiError(400, "Số điện thoại đã được đăng ký");
    }

    // Đếm số lượng độc giả hiện có
    const count = await DocGia.countDocuments();
    const maDocGia = `DG${String(count + 1).padStart(3, "0")}`; // DG001, DG002, ...

    // Tạo độc giả mới
    const newDocGia = new DocGia({
        MADOCGIA: maDocGia,
        TEN: "Chưa cập nhật", // Độc giả có thể cập nhật sau
        SODIENTHOAI: sdt,
        PASSWORD: password
    });

    await newDocGia.save();

    return { message: "Đăng ký thành công", user: newDocGia };
};
