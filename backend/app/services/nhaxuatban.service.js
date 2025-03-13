const NhaXuatBan = require("../models/NhaXuatBan");
const ApiError = require("../api-error");

const getAllNhaXuatBan = async () => {
  const nhaXuatBans = await NhaXuatBan.find();
  if (!nhaXuatBans || nhaXuatBans.length === 0) {
    throw new ApiError(404, "Không tìm thấy nhà xuất bản nào");
  }
  return nhaXuatBans;
};

const getNhaXuatBanById = async (id) => {
  if (!id) throw new ApiError(400, "ID không hợp lệ");
  const nhaXuatBan = await NhaXuatBan.findById(id);
  if (!nhaXuatBan) throw new ApiError(404, "Không tìm thấy nhà xuất bản");
  return nhaXuatBan;
};

const createNhaXuatBan = async (data) => {
  try {
    //console.log("Dữ liệu nhận được:", data); // Debug log

    if (!data || !data.TENNXB) {
      throw new ApiError(400, "Dữ liệu không hợp lệ");
    }

    if (!data.MANXB) {
      const count = await NhaXuatBan.countDocuments();
      data.MANXB = `NXB${String(count + 1).padStart(3, "0")}`;  // Mã NXB mới
    }

    const newNhaXuatBan = new NhaXuatBan(data);
    return await newNhaXuatBan.save();

  } catch (error) {
    //console.error("Lỗi khi tạo độc giả:", error); // Log lỗi để debug
    throw new ApiError(500, "Lỗi server khi tạo độc giả");
  } 
};

const updateNhaXuatBan = async (id, data) => {
  if (!id || !data) throw new ApiError(400, "ID hoặc dữ liệu không hợp lệ");
  const nhaXuatBan = await NhaXuatBan.findByIdAndUpdate(id, data, { new: true });
  if (!nhaXuatBan) throw new ApiError(404, "Không tìm thấy nhà xuất bản");
  return nhaXuatBan;
};

const deleteNhaXuatBan = async (id) => {
  if (!id) throw new ApiError(400, "ID không hợp lệ");
  const result = await NhaXuatBan.findByIdAndDelete(id);
  if (!result) throw new ApiError(404, "Không tìm thấy nhà xuất bản");
  return result;
};

module.exports = {
  getAllNhaXuatBan,
  getNhaXuatBanById,
  createNhaXuatBan,
  updateNhaXuatBan,
  deleteNhaXuatBan,
};
