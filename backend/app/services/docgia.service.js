const DocGia = require("../models/DocGia");
const ApiError = require("../api-error");

// Lấy tất cả độc giả
exports.getAllDocGia = async () => {
  const docGias = await DocGia.find();
  if (!docGias || docGias.length === 0) {
    throw new ApiError(404, "Không tìm thấy độc giả nào");
  }
  return docGias;
};

// Lấy độc giả theo ID
exports.getDocGiaById = async (id) => {
  const docGia = await DocGia.findById(id);
  if (!docGia) {
    throw new ApiError(404, "Không tìm thấy độc giả");
  }
  return docGia;
};

// Tạo độc giả mới
exports.createDocGia = async (data) => {
  try {
    const newDocGia = new DocGia(data);
    return await newDocGia.save();
  } catch (error) {
    throw new ApiError(400, "Dữ liệu độc giả không hợp lệ");
  }
};

// Cập nhật thông tin độc giả
exports.updateDocGia = async (id, data) => {
  const updatedDocGia = await DocGia.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedDocGia) {
    throw new ApiError(404, "Không tìm thấy độc giả để cập nhật");
  }
  return updatedDocGia;
};

// Xóa độc giả
exports.deleteDocGia = async (id) => {
  const deletedDocGia = await DocGia.findByIdAndDelete(id);
  if (!deletedDocGia) {
    throw new ApiError(404, "Không tìm thấy độc giả để xóa");
  }
  return deletedDocGia;
};

const timTheoSDT = async (sdt) => {
    return await DocGia.findOne({ SDT: sdt });
};

const taoMoi = async (data) => {
    const docGia = new DocGia(data);
    await docGia.save();
    return docGia;
};

module.exports = { timTheoSDT, taoMoi };

