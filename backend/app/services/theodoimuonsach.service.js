const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const ApiError = require("../api-error");

// Lấy tất cả lịch sử mượn sách
const getAllRecords = async () => {
  const records = await TheoDoiMuonSach.find().populate("MADOCGIA").populate("MASACH");
  if (!records || records.length === 0) {
    throw new ApiError(404, "Không tìm thấy lịch sử mượn sách");
  }
  return records;
};

// Lấy lịch sử mượn theo ID
const getRecordById = async (id) => {
  const record = await TheoDoiMuonSach.findById(id).populate("MADOCGIA").populate("MASACH");
  if (!record) {
    throw new ApiError(404, "Không tìm thấy lịch sử mượn");
  }
  return record;
};

// Tạo mới lịch sử mượn (trạng thái mặc định: "Chờ duyệt")
const createRecord = async (data) => {
  try {
    const newRecord = new TheoDoiMuonSach(data);
    return await newRecord.save();
  } catch (error) {
    throw new ApiError(400, "Dữ liệu lịch sử mượn không hợp lệ");
  }
};

// Cập nhật trạng thái mượn (VD: từ "Chờ duyệt" => "Đang mượn" hoặc "Đã trả")
const updateStatus = async (id, data) => {
  const updatedStatus = await TheoDoiMuonSach.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedStatus) {
    throw new ApiError(404, "Không tìm thấy sách để cập nhật");
  }

  return { message: "Cập nhật sách thành công", updatedStatus };
};


// Xóa lịch sử mượn
const deleteRecord = async (id) => {
  const deletedRecord = await TheoDoiMuonSach.findByIdAndDelete(id);
  if (!deletedRecord) {
    throw new ApiError(404, "Không tìm thấy lịch sử mượn để xóa");
  }
  return { message: "Cập nhật sách thành công", deletedRecord };
};

module.exports = {
  getAllRecords,
  getRecordById,
  createRecord,
  updateStatus,
  deleteRecord,
};
