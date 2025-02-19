const DocGia = require("../models/DocGia");
const ApiError = require("../api-error");

// Lấy tất cả độc giả
const getAllDocGia = async () => {
  const docGias = await DocGia.find();
  if (!docGias || docGias.length === 0) {
    throw new ApiError(404, "Không tìm thấy độc giả nào");
  }
  return docGias;
};

// Lấy độc giả theo ID
const getDocGiaById = async (id) => {
  const docGia = await DocGia.findById(id);
  if (!docGia) {
    throw new ApiError(404, "Không tìm thấy độc giả");
  }
  return docGia;
};

// Tạo độc giả mới
const createDocGia = async (data) => {
  try {
    // Kiểm tra nếu số điện thoại đã tồn tại
    const existingDocGia = await DocGia.findOne({ SODIENTHOAI: data.SODIENTHOAI });
    if (existingDocGia) {
      throw new ApiError(400, "Số điện thoại đã tồn tại");
    }

    if (!data.MADOCGIA) {
      const count = await DocGia.countDocuments();
      data.MADOCGIA = `DG${String(count + 1).padStart(3, "0")}`; // Tạo mã NV001, NV002...
    }

    //console.log("Dữ liệu nhận được:", data); 
    const newDocGia = new DocGia(data);
    return await newDocGia.save();
  } catch (error) {
    //console.error("Lỗi khi tạo độc giả:", error); // Log lỗi để debug
    throw new ApiError(500, "Lỗi server khi tạo độc giả");
  }
};

// Cập nhật thông tin độc giả
const updateDocGia = async (id, data) => {
  const updatedDocGia = await DocGia.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedDocGia) {
    throw new ApiError(404, "Không tìm thấy độc giả để cập nhật");
  }
  return { message: "Cập nhật độc giả thành công", updatedDocGia };
};

// Xóa độc giả
const deleteDocGia = async (id) => {
  const deletedDocGia = await DocGia.findByIdAndDelete(id);
  if (!deletedDocGia) {
    throw new ApiError(404, "Không tìm thấy độc giả để xóa");
  }
  return { message: "Xóa độc giả thành công", deletedDocGia };
};

// Tìm độc giả theo số điện thoại
const getDocGiaBySDT = async (sdt) => {
  const docGia = await DocGia.findOne({ SODIENTHOAI: sdt });
  if (!docGia) {
    throw new ApiError(404, "Không tìm thấy độc giả với số điện thoại này");
  }
  return docGia;
};

// Tìm độc giả theo tên (cho phép tìm gần đúng)
const getDocGiaByTen = async (ten) => {
  const docGias = await DocGia.find({ TEN: { $regex: ten, $options: "i" } });
  if (!docGias.length) {
    throw new ApiError(404, "Không tìm thấy độc giả với tên này");
  }
  return docGias;
};

// Tìm độc giả theo mã độc giả
// const getDocGiaByMa = async (ma) => {
//   const docGia = await DocGia.findOne({ MADOCGIA: ma });
//   if (!docGia) {
//     throw new ApiError(404, "Không tìm thấy độc giả với mã độc giả này");
//   }
//   return docGia;
// };

// Tạo độc giả mới
// const taoMoi = async (data) => {
//   const docGia = new DocGia(data);
//   await docGia.save();
//   return docGia;
// };

module.exports = {
  getAllDocGia,
  getDocGiaById,
  createDocGia,
  updateDocGia,
  deleteDocGia,
  getDocGiaBySDT,
  getDocGiaByTen,
  // getDocGiaByMa,
  // taoMoi
};
