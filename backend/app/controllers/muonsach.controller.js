const muonSachService = require("../services/muonsach.service");
const ApiError = require("../api-error");

exports.dangKyMuonSach = async (req, res, next) => {
    try {
        const { docGiaId, sach , ngayMuon } = req.body;

        const result = await muonSachService.dangKyMuonSach(docGiaId, sach, ngayMuon);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

exports.duyetMuonSach = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await muonSachService.duyetMuonSach(id);
        return res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.xacNhanTraSach = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await muonSachService.xacNhanTraSach(id);
        return res.json(result);
    } catch (error) {
        next(error);
    }
};
