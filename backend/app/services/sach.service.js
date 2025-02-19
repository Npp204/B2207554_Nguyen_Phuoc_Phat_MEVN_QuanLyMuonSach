const Sach = require("../models/Sach");
const ApiError = require("../api-error");

// Lấy tất cả sách
const getAllSach = async () => {
  const sachs = await Sach.find().populate("MANXB");
  if (!sachs || sachs.length === 0) {
    throw new ApiError(404, "Không tìm thấy sách nào");
  }
  return sachs;
};

// Lấy sách theo ID
const getSachById = async (id) => {
  const sach = await Sach.findById(id).populate("MANXB");
  if (!sach) {
    throw new ApiError(404, "Không tìm thấy sách");
  }
  return sach;
};

// Tạo sách mới
const createSach = async (data) => {
  if (!data || !data.TENSACH) {
    throw new ApiError(400, "Dữ liệu không hợp lệ");
  }

  if (!data.MASACH) {
    const count = await Sach.countDocuments();
    data.MASACH = `MS${String(count + 1).padStart(3, "0")}`; // Tạo mã NV001, NV002...
  }

  try {
    const newSach = new Sach(data);
    return await newSach.save();
  } catch (error) {
    console.error("Lỗi khi tạo sách:", error);
    throw new ApiError(400, "Dữ liệu sách không hợp lệ");
  }
};

// Cập nhật sách
const updateSach = async (id, data) => {
  const updatedSach = await Sach.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedSach) {
    throw new ApiError(404, "Không tìm thấy sách để cập nhật");
  }

  return { message: "Cập nhật sách thành công", updatedSach };
};

// Xóa sách
const deleteSach = async (id) => {
  const deletedSach = await Sach.findByIdAndDelete(id);
  
  if (!deletedSach) {
    throw new ApiError(404, "Không tìm thấy sách để xóa");
  }

  return { message: "Xóa sách thành công", deletedSach };
};

module.exports = {
  getAllSach,
  getSachById,
  createSach,
  updateSach,
  deleteSach,
};
