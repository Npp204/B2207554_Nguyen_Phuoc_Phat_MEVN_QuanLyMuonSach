const docGiaService = require("../services/docgia.service");
const ApiError = require("../api-error");

exports.getAllDocGia = async (req, res, next) => {
  try {
    const docGias = await docGiaService.getAllDocGia();
    res.status(200).json(docGias);
  } catch (error) {
    next(error);
  }
};

exports.getDocGiaById = async (req, res, next) => {
  try {
    const docGia = await docGiaService.getDocGiaById(req.params.id);
    res.status(200).json(docGia);
  } catch (error) {
    next(error);
  }
};

exports.createDocGia = async (req, res, next) => {
  try {
    const newDocGia = await docGiaService.createDocGia(req.body);
    res.status(201).json(newDocGia);
  } catch (error) {
    next(error);
  }
};

exports.updateDocGia = async (req, res, next) => {
  try {
    const updatedDocGia = await docGiaService.updateDocGia(req.params.id, req.body);
    res.status(200).json(updatedDocGia);
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

// exports.getDocGiaBySDT = async (req, res, next) => {
//   try {
//     const docGia = await docGiaService.getDocGiaBySDT(req.params.sdt);
//     res.status(200).json(docGia);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getDocGiaByTen = async (req, res, next) => {
//   try {
//     const docGias = await docGiaService.getDocGiaByTen(req.params.ten);
//     res.status(200).json(docGias);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getDocGiaByMa = async (req, res, next) => {
//   try {
//     const docGias = await docGiaService.getDocGiaByTen(req.params.ma);
//     res.status(200).json(docGias);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.timDocGia = async (req, res, next) => {
//   try {
//     const { timsdt, timten, timmdg } = req.query; // Lấy dữ liệu từ query params

//     if (timsdt) {
//       const docGia = await docGiaService.getDocGiaBySDT(timsdt);
//       return res.json(docGia);
//     }

//     if (timten) {
//       const docGias = await docGiaService.getDocGiaByTen(timten);
//       return res.json(docGias);
//     }

//     if (timmdg) {
//       const docGia = await docGiaService.getDocGiaByTen(timmdg);
//       return res.json(docGia);
//     }

//     throw new ApiError(400, "Bạn phải nhập số điện thoại hoặc tên hoặc mã độc giả để tìm kiếm");
//   } catch (error) {
//     next(error);
//   }
// };

