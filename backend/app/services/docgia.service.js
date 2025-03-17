const DocGia = require("../models/DocGia");
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs"); // Thêm bcrypt để mã hóa mật khẩu

// Lấy tất cả độc giả (ẩn PASSWORD)
const getAllDocGia = async () => {
  const docGias = await DocGia.find().select("-PASSWORD"); // Loại bỏ PASSWORD khỏi kết quả
  if (!docGias || docGias.length === 0) {
    throw new ApiError(404, "Không tìm thấy độc giả nào");
  }
  return docGias;
};

// Lấy độc giả theo ID (ẩn PASSWORD)
const getDocGiaById = async (id) => {
  const docGia = await DocGia.findById(id).select("-PASSWORD");
  if (!docGia) {
    throw new ApiError(404, "Không tìm thấy độc giả");
  }
  return docGia;
};

// Tạo độc giả mới (mã hóa mật khẩu)
const createDocGia = async (data) => {
  try {
    // Kiểm tra nếu số điện thoại đã tồn tại
    const existingDocGia = await DocGia.findOne({ SODIENTHOAI: data.SODIENTHOAI });
    if (existingDocGia) {
      throw new ApiError(400, "Số điện thoại đã tồn tại");
    }

    if (!data.MADOCGIA) {
      const count = await DocGia.countDocuments();
      data.MADOCGIA = `DG${String(count + 1).padStart(3, "0")}`;
    }

    // Mã hóa mật khẩu trước khi lưu
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

// Cập nhật thông tin độc giả (mã hóa mật khẩu nếu có)
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

// Xóa độc giả
const deleteDocGia = async (id) => {
  const deletedDocGia = await DocGia.findByIdAndDelete(id).select("-PASSWORD");
  if (!deletedDocGia) {
    throw new ApiError(404, "Không tìm thấy độc giả để xóa");
  }
  return { message: "Xóa độc giả thành công", deletedDocGia };
};

// // Tìm độc giả theo số điện thoại (ẩn PASSWORD)
// const getDocGiaBySDT = async (sdt) => {
//   const docGia = await DocGia.findOne({ SODIENTHOAI: sdt }).select("-PASSWORD");
//   if (!docGia) {
//     throw new ApiError(404, "Không tìm thấy độc giả với số điện thoại này");
//   }
//   return docGia;
// };

// // Tìm độc giả theo tên (cho phép tìm gần đúng, ẩn PASSWORD)
// const getDocGiaByTen = async (ten) => {
//   const docGias = await DocGia.find({ TEN: { $regex: ten, $options: "i" } }).select("-PASSWORD");
//   if (!docGias.length) {
//     throw new ApiError(404, "Không tìm thấy độc giả với tên này");
//   }
//   return docGias;
// };

module.exports = {
  getAllDocGia,
  getDocGiaById,
  createDocGia,
  updateDocGia,
  deleteDocGia,
};
