const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const Sach = require("../models/Sach");
const ApiError = require("../api-error");

// Độc giả đăng ký mượn sách
const dangKyMuonSach = async (docGiaId, sachList, ngayMuon) => {
    if (!Array.isArray(sachList) || sachList.length === 0) {
        throw new ApiError(400, "Danh sách sách mượn không hợp lệ");
    }

    // if(ngayTra) {
    //     // Kiểm tra ngày trả không được quá 2 tuần
    //     const maxNgayTra = new Date(ngayMuon);
    //     maxNgayTra.setDate(maxNgayTra.getDate() + 14);
    //     if (new Date(ngayTra) > maxNgayTra) {
    //         throw new ApiError(400, "Ngày trả không được quá 2 tuần sau ngày mượn");
    //     }
    // }

    // Kiểm tra từng sách có tồn tại không và có đủ số lượng không
    for (const item of sachList) {
        const sach = await Sach.findById(item.sachId);
        if (!sach) {
            throw new ApiError(404, `Không tìm thấy sách với ID: ${item.sachId}`);
        }
        if (sach.SOQUYEN < item.soLuong) {
            throw new ApiError(400, `Sách "${sach.TENSACH}" chỉ còn ${sach.SOQUYEN} quyển, không đủ số lượng yêu cầu`);
        }
    }

    // Lưu danh sách mượn
    const muonSachList = await Promise.all(
        sachList.map(async (item) => {
            return await new TheoDoiMuonSach({
                MADOCGIA: docGiaId,
                MASACH: item.sachId,
                SOQUYEN: item.soLuong, 
                NGAYMUON: ngayMuon,
                TRANGTHAI: "Chờ duyệt"
            }).save();
        })
    );

    return { message: "Đăng ký mượn sách thành công, vui lòng chờ duyệt", muonSachList };
};


// Nhân viên duyệt mượn sách
const duyetMuonSach = async (id) => {
    const muonSach = await TheoDoiMuonSach.findById(id);
    if (!muonSach) {
        throw new ApiError(404, "Không tìm thấy yêu cầu mượn sách");
    }
    if (muonSach.TRANGTHAI !== "Chờ duyệt") {
        throw new ApiError(400, "Yêu cầu này không thể duyệt");
    }

    // Cập nhật trạng thái và giảm số lượng sách
    const sach = await Sach.findById(muonSach.MASACH);
    if (!sach) {
        throw new ApiError(404, "Không tìm thấy sách");
    }
    if (sach.SOQUYEN < muonSach.SOQUYEN) {
        throw new ApiError(400, `Sách "${sach.TENSACH}" không đủ số lượng để duyệt`);
    }

    sach.SOQUYEN -= muonSach.SOQUYEN;  
    await sach.save();

    muonSach.TRANGTHAI = "Đang mượn";
    await muonSach.save();

    return { message: "Đã duyệt yêu cầu mượn sách", muonSach };
};

// Nhân viên xác nhận trả sách
const xacNhanTraSach = async (id) => {
    const muonSach = await TheoDoiMuonSach.findById(id);
    if (!muonSach) {
        throw new ApiError(404, "Không tìm thấy yêu cầu mượn sách");
    }
    if (muonSach.TRANGTHAI !== "Đang mượn") {
        throw new ApiError(400, "Không thể xác nhận trả sách");
    }

    // Cập nhật trạng thái và tăng số lượng sách
    const sach = await Sach.findById(muonSach.MASACH);
    if (sach) {
        sach.SOQUYEN += muonSach.SOQUYEN;  
        await sach.save();
    }

    muonSach.TRANGTHAI = "Đã trả";
    muonSach.NGAYTRA = new Date();  
    await muonSach.save();
    await muonSach.save();

    return { message: "Xác nhận trả sách thành công", muonSach };
};


module.exports = {
    dangKyMuonSach,
    duyetMuonSach,
    xacNhanTraSach
};
