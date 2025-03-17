const NhanVien = require("../models/NhanVien");
const DocGia = require("../models/DocGia");
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  
const config = require("../config");

const salt = bcrypt.genSaltSync(10);

// Hàm kiểm tra số điện thoại hợp lệ
const isValidPhoneNumber = (sdt) => {
    const regex = /^(09|03|05|07|08)[0-9]{8}$/;
    return regex.test(sdt);
};

// Đăng nhập nhân viên
const loginNhanVien = async (sdt, password) => {
    if (!sdt || !password) {
        throw new ApiError(400, "Số điện thoại và mật khẩu là bắt buộc");
    }

    if (!isValidPhoneNumber(sdt)) {
        throw new ApiError(400, "Số điện thoại không hợp lệ");
    }

    const nhanVien = await NhanVien.findOne({ SODIENTHOAI: sdt });

    // if (!nhanVien || String(nhanVien.PASSWORD) !== String(password)) {
    //     throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    // }

    const isMatch = bcrypt.compareSync(password, nhanVien.PASSWORD);
    if (!isMatch) {
        throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    }

    const token = jwt.sign(
        { id: nhanVien._id, role: "nhanvien" }, 
        config.jwt.secret, 
        { expiresIn: "2h" }
    );

    return { role: "nhanvien", user: nhanVien, token };
};

// Đăng nhập độc giả
const loginDocGia = async (sdt, password) => {
    if (!sdt || !password) {
        throw new ApiError(400, "Số điện thoại và mật khẩu là bắt buộc");
    }

    if (!isValidPhoneNumber(sdt)) {
        throw new ApiError(400, "Số điện thoại không hợp lệ");
    }

    const docGia = await DocGia.findOne({ SODIENTHOAI: sdt });

    // if (!docGia || String(docGia.PASSWORD) !== String(password)) {
    //     throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    // }

    const isMatch = bcrypt.compareSync(password, docGia.PASSWORD);
    if (!isMatch) {
        throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác");
    }

    // console.log("Đăng nhập thành công:", docGia);
    // console.log("JWT Secret:", config.jwt.secret);  
    // const token = jwt.sign(
    //     { id: docGia._id, role: "docgia" }, 
    //     config.jwt.secret, 
    //     { expiresIn: "3h" }
    // );
    
    // return { role: "docgia", user: docGia, token };
    try {
        const token = jwt.sign(
            { id: docGia._id, role: "docgia" },
            config.jwt.secret,  
            { expiresIn: "2h" }
        );

        //console.log("Token tạo thành công:", token); 

        return { role: "docgia", user: docGia, token };
    } catch (error) {
        console.error("Lỗi khi tạo token:", error);
        throw new ApiError(500, "Lỗi khi tạo token");
    }
};

// Đăng ký độc giả
const registerDocGia = async (sdt, password, confirmPassword) => {
    if (!sdt || !password || !confirmPassword) {
        throw new ApiError(400, "Số điện thoại, mật khẩu và xác nhận mật khẩu là bắt buộc");
    }

    if (!isValidPhoneNumber(sdt)) {
        throw new ApiError(400, "Số điện thoại không hợp lệ");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Mật khẩu xác nhận không khớp");
    }

    const existingDocGia = await DocGia.findOne({ SODIENTHOAI: sdt });

    if (existingDocGia) {
        throw new ApiError(400, "Số điện thoại đã được đăng ký");
    }

    //Đếm số lượng độc giả hiện có
    const count = await DocGia.countDocuments();
    const maDocGia = `DG${String(count + 1).padStart(3, "0")}`; // DG001, DG002, ...

    const hashedPassword = bcrypt.hashSync(password, salt);

    // Tạo độc giả mới
    const newDocGia = new DocGia({
        MADOCGIA: maDocGia,
        TEN: "Chưa cập nhật", // Độc giả có thể cập nhật sau
        SODIENTHOAI: sdt,
        PASSWORD: hashedPassword 
    });

    await newDocGia.save();

    // await DocGia.create({
    //     TEN: "Chưa cập nhật",
    //     SODIENTHOAI: sdt,
    //     PASSWORD: password
    // });

    return { message: "Đăng ký thành công", user: newDocGia };
};

const registerNhanVien = async (sdt, password, confirmPassword) => {
    if (!sdt || !password || !confirmPassword) {
        throw new ApiError(400, "Số điện thoại, mật khẩu và xác nhận mật khẩu là bắt buộc");
    }

    if (!isValidPhoneNumber(sdt)) {
        throw new ApiError(400, "Số điện thoại không hợp lệ");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Mật khẩu xác nhận không khớp");
    }

    const existingNhanVien = await NhanVien.findOne({ SODIENTHOAI: sdt });

    if (existingNhanVien) {
        throw new ApiError(400, "Số điện thoại đã được đăng ký");
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newNhanVien = new NhanVien({
        TEN: "Chưa cập nhật",
        SODIENTHOAI: sdt,
        PASSWORD: hashedPassword
    });

    await newNhanVien.save();

    return { message: "Đăng ký thành công", user: newNhanVien };
}

module.exports = { loginNhanVien, loginDocGia, registerDocGia, registerNhanVien };
