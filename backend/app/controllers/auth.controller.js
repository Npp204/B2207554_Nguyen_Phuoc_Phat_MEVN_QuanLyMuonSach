const nhanVienService = require("../services/nhanvien.service");
const docGiaService = require("../services/docgia.service");

const login = async (req, res, next) => {
    try {
        const { sdt } = req.body;

        if (!sdt) {
            return res.status(400).json({ message: "Số điện thoại là bắt buộc" });
        }

        // Kiểm tra nhân viên
        const nhanVien = await nhanVienService.timTheoSDT(sdt);
        if (nhanVien) {
            return res.json({ message: "Đăng nhập thành công", role: "nhanvien", user: nhanVien });
        }

        // Kiểm tra độc giả
        let docGia = await docGiaService.timTheoSDT(sdt);
        if (docGia) {
            return res.json({ message: "Đăng nhập thành công", role: "docgia", user: docGia });
        }

        // Nếu không tìm thấy, tạo mới độc giả
        docGia = await docGiaService.taoMoi({ SDT: sdt });
        return res.json({ message: "Đăng ký và đăng nhập thành công", role: "docgia", user: docGia });
    } catch (error) {
        next(error);
    }
};

module.exports = { login };
