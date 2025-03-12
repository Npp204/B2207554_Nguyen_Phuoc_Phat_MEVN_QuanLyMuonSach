const muonSachService = require("../services/muonsach.service");
const ApiError = require("../api-error");

// Độc giả đăng ký mượn sách
exports.dangKyMuonSach = async (req, res, next) => {
    try {
        const { docGiaId, sachId, ngayMuon, ngayTra } = req.body;
        const result = await muonSachService.dangKyMuonSach(docGiaId, sachId, ngayMuon, ngayTra);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// Nhân viên duyệt mượn sách
exports.duyetMuonSach = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await muonSachService.duyetMuonSach(id);
        return res.json(result);
    } catch (error) {
        next(error);
    }
};

// Nhân viên xác nhận trả sách
exports.xacNhanTraSach = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await muonSachService.xacNhanTraSach(id);
        return res.json(result);
    } catch (error) {
        next(error);
    }
};
