const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const Sach = require("../models/Sach");
const ApiError = require("../api-error");

// Độc giả đăng ký mượn sách
const dangKyMuonSach = async (docGiaId, sachId, ngayMuon, ngayTra) => {
    const sach = await Sach.findById(sachId);
    if (!sach) {
        throw new ApiError(404, "Không tìm thấy sách");
    }
    if (sach.soLuong <= 0) {
        throw new ApiError(400, "Sách đã hết, không thể mượn");
    }

    // Giới hạn ngày trả tối đa 2 tuần
    const maxNgayTra = new Date(ngayMuon);
    maxNgayTra.setDate(maxNgayTra.getDate() + 14);
    if (new Date(ngayTra) > maxNgayTra) {
        throw new ApiError(400, "Ngày trả không được quá 2 tuần sau ngày mượn");
    }

    const muonSach = new TheoDoiMuonSach({
        docGia: docGiaId,
        sach: sachId,
        ngayMuon,
        ngayTra,
        trangThai: "Chờ duyệt"
    });

    await muonSach.save();
    return { message: "Đăng ký mượn sách thành công, vui lòng chờ duyệt", muonSach };
};

// Nhân viên duyệt mượn sách
const duyetMuonSach = async (id) => {
    const muonSach = await TheoDoiMuonSach.findById(id);
    if (!muonSach) {
        throw new ApiError(404, "Không tìm thấy yêu cầu mượn sách");
    }
    if (muonSach.trangThai !== "Chờ duyệt") {
        throw new ApiError(400, "Yêu cầu này không thể duyệt");
    }

    // Cập nhật trạng thái và giảm số lượng sách
    const sach = await Sach.findById(muonSach.sach);
    if (!sach || sach.soLuong <= 0) {
        throw new ApiError(400, "Sách đã hết, không thể duyệt");
    }

    sach.soLuong -= 1;
    await sach.save();

    muonSach.trangThai = "Đang mượn";
    await muonSach.save();

    return { message: "Đã duyệt yêu cầu mượn sách", muonSach };
};

// Nhân viên xác nhận trả sách
const xacNhanTraSach = async (id) => {
    const muonSach = await TheoDoiMuonSach.findById(id);
    if (!muonSach) {
        throw new ApiError(404, "Không tìm thấy yêu cầu mượn sách");
    }
    if (muonSach.trangThai !== "Đang mượn") {
        throw new ApiError(400, "Không thể xác nhận trả sách");
    }

    // Cập nhật trạng thái và tăng số lượng sách
    const sach = await Sach.findById(muonSach.sach);
    if (sach) {
        sach.soLuong += 1;
        await sach.save();
    }

    muonSach.trangThai = "Đã trả";
    await muonSach.save();

    return { message: "Xác nhận trả sách thành công", muonSach };
};

module.exports = {
    dangKyMuonSach,
    duyetMuonSach,
    xacNhanTraSach
};
