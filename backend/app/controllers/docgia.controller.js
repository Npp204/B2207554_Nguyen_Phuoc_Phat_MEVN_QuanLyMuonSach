const docGiaService = require("../services/docgia.service");
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs"); 

exports.getAllDocGia = async (req, res, next) => {
  try {
    const docGias = await docGiaService.getAllDocGia();

    // Không trả về trường PASSWORD
    const docGiasWithoutPassword = docGias.map(({ PASSWORD, ...rest }) => rest);

    res.status(200).json(docGiasWithoutPassword);
  } catch (error) {
    next(error);
  }
};

exports.getDocGiaById = async (req, res, next) => {
  try {
    const docGia = await docGiaService.getDocGiaById(req.params.id);

    const { PASSWORD, ...docGiaWithoutPassword } = docGia.toObject();
    res.status(200).json(docGiaWithoutPassword);
  } catch (error) {
    next(error);
  }
};

exports.createDocGia = async (req, res, next) => {
  try {
    if (!req.body.PASSWORD) {
      throw new ApiError(400, "Mật khẩu không được để trống");
    }

    req.body.PASSWORD = await bcrypt.hash(req.body.PASSWORD, 10);

    const newDocGia = await docGiaService.createDocGia(req.body);

    const { PASSWORD, ...docGiaWithoutPassword } = newDocGia.toObject();
    res.status(201).json(docGiaWithoutPassword);
  } catch (error) {
    next(error);
  }
};

exports.updateDocGia = async (req, res, next) => {
  try {
    if (req.body.PASSWORD) {
      req.body.PASSWORD = await bcrypt.hash(req.body.PASSWORD, 10);
    }

    const updatedDocGia = await docGiaService.updateDocGia(req.params.id, req.body);

    const { PASSWORD, ...docGiaWithoutPassword } = updatedDocGia.toObject();
    res.status(200).json(docGiaWithoutPassword);
  } catch (error) {
    next(error);
  }
};

exports.deleteDocGia = async (req, res, next) => {
  try {
    const deletedDocGia = await docGiaService.deleteDocGia(req.params.id);
    res.status(200).json({ message: "Đã xóa độc giả thành công", deletedDocGia });
  } catch (error) {
    next(error);
  }
};
