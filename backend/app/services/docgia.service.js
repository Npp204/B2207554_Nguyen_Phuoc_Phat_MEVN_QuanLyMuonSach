const DocGia = require("../models/DocGia");
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs"); 

const getAllDocGia = async () => {
  const docGias = await DocGia.find().select("-PASSWORD"); 
  // if (!docGias || docGias.length === 0) {
  //   throw new ApiError(404, "Không tìm thấy độc giả nào");
  // }
  return docGias;
};

const getDocGiaById = async (id) => {
  const docGia = await DocGia.findById(id).select("-PASSWORD");
  if (!docGia) {
    throw new ApiError(404, "Không tìm thấy độc giả");
  }
  return docGia;
};

const createDocGia = async (data) => {
  try {
    const existingDocGia = await DocGia.findOne({ SODIENTHOAI: data.SODIENTHOAI });
    if (existingDocGia) {
      throw new ApiError(400, "Số điện thoại đã tồn tại");
    }

    const lastDocGia = await DocGia.findOne().sort({ MADOCGIA: -1 }) 

    let newMADOCGIA = 'DG001' 
    if (lastDocGia) {
      let lastNumber = parseInt(lastDocGia.MADOCGIA.replace('DG', ''), 10)
      newMADOCGIA = `DG${String(lastNumber + 1).padStart(3, '0')}`
    }

    if (data.PASSWORD) {
      data.PASSWORD = await bcrypt.hash(data.PASSWORD, 10);
    }

    const newDocGia = new DocGia(data);
    await newDocGia.save();

    return { ...newDocGia.toObject(), PASSWORD: undefined }; 
  } catch (error) {
    throw new ApiError(500, "Lỗi server khi tạo độc giả");
  }
};

const updateDocGia = async (id, data) => {
  if (data.PASSWORD) {
    data.PASSWORD = await bcrypt.hash(data.PASSWORD, 10);
  }

  const updatedDocGia = await DocGia.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-PASSWORD");

  if (!updatedDocGia) {
    throw new ApiError(404, "Không tìm thấy độc giả để cập nhật");
  }

  return { message: "Cập nhật độc giả thành công", updatedDocGia };
};

const deleteDocGia = async (id) => {
  const deletedDocGia = await DocGia.findByIdAndDelete(id).select("-PASSWORD");
  if (!deletedDocGia) {
    throw new ApiError(404, "Không tìm thấy độc giả để xóa");
  }
  return { message: "Xóa độc giả thành công", deletedDocGia };
};

module.exports = {
  getAllDocGia,
  getDocGiaById,
  createDocGia,
  updateDocGia,
  deleteDocGia,
};
