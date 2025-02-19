const TheoDoiMuonSach = require('../models/TheoDoiMuonSach');
const ApiError = require('../api-error');

// Lấy tất cả lịch sử mượn sách
exports.getAllRecords = async () => {
  const records = await TheoDoiMuonSach.find().populate('docGia').populate('sach');
  if (!records || records.length === 0) {
    throw new ApiError(404, 'Không tìm thấy lịch sử mượn sách');
  }
  return records;
};

// Lấy lịch sử mượn theo ID
exports.getRecordById = async (id) => {
  const record = await TheoDoiMuonSach.findById(id).populate('docGia').populate('sach');
  if (!record) {
    throw new ApiError(404, 'Không tìm thấy lịch sử mượn');
  }
  return record;
};

// Tạo mới lịch sử mượn (trạng thái mặc định: "Chờ duyệt")
exports.createRecord = async (data) => {
  try {
    const newRecord = new TheoDoiMuonSach(data);
    return await newRecord.save();
  } catch (error) {
    throw new ApiError(400, 'Dữ liệu lịch sử mượn không hợp lệ');
  }
};

// Cập nhật trạng thái mượn (VD: từ "Chờ duyệt" => "Đang mượn" hoặc "Đã trả")
exports.updateStatus = async (id, trangThai) => {
  const record = await TheoDoiMuonSach.findByIdAndUpdate(
    id, 
    { trangThai },
    { new: true, runValidators: true }
  );
  if (!record) {
    throw new ApiError(404, 'Không tìm thấy lịch sử mượn để cập nhật');
  }
  return record;
};

// Xóa lịch sử mượn
exports.deleteRecord = async (id) => {
  const deletedRecord = await TheoDoiMuonSach.findByIdAndDelete(id);
  if (!deletedRecord) {
    throw new ApiError(404, 'Không tìm thấy lịch sử mượn để xóa');
  }
  return deletedRecord;
};
