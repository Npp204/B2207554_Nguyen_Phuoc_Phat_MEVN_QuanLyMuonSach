const NhanVien = require("../models/NhanVien");
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs");

// Lấy tất cả nhân viên
const getAllNhanVien = async () => {
  const nhanViens = await NhanVien.find();
  if (!nhanViens.length) {
    throw new ApiError(404, "Không tìm thấy nhân viên nào");
  }
  return nhanViens;
};

// Lấy nhân viên theo ID
const getNhanVienById = async (id) => {
  const nhanVien = await NhanVien.findById(id);
  if (!nhanVien) {
    throw new ApiError(404, "Không tìm thấy nhân viên");
  }
  return nhanVien;
};

// Tạo nhân viên mới
// const createNhanVien = async (data) => {
//   try {
//     // Kiểm tra số điện thoại đã tồn tại chưa
//     const existingNhanVien = await NhanVien.findOne({ SODIENTHOAI: data.SODIENTHOAI });
//     if (existingNhanVien) {
//       throw new ApiError(400, "Số điện thoại đã tồn tại");
//     }

//     // Mã hóa mật khẩu trước khi lưu
//     data.PASSWORD = await bcrypt.hash(data.PASSWORD, 10);

//     const newNhanVien = new NhanVien(data);
//     await newNhanVien.save();
    
//     return { message: "Tạo nhân viên thành công", newNhanVien };
//   } catch (error) {
//     throw new ApiError(400, "Dữ liệu nhân viên không hợp lệ");
//   }
// };

const createNhanVien = async (data) => {
  try {
    //console.log("Dữ liệu nhận được:", data); // ✅ Log dữ liệu đầu vào

    // Kiểm tra số điện thoại đã tồn tại chưa
    const existingNhanVien = await NhanVien.findOne({ SODIENTHOAI: data.SODIENTHOAI });
    if (existingNhanVien) {
      throw new ApiError(400, "Số điện thoại đã tồn tại");
    }

    if (!data.MANV) {
      const count = await NhanVien.countDocuments();
      data.MANV = `NV${String(count + 1).padStart(3, "0")}`; // Tạo mã NV001, NV002...
    }

    // Mã hóa mật khẩu trước khi lưu
    data.PASSWORD = await bcrypt.hash(data.PASSWORD, 10);

    const newNhanVien = new NhanVien(data);
    await newNhanVien.save();
    
    //console.log("Nhân viên mới đã lưu:", newNhanVien); 
    return { message: "Tạo nhân viên thành công", newNhanVien };
  } catch (error) {
    //console.error("Lỗi khi tạo nhân viên:", error); 
    throw new ApiError(400, error.message || "Dữ liệu nhân viên không hợp lệ");
  }
};

// Cập nhật thông tin nhân viên
const updateNhanVien = async (id, data) => {
  if (data.PASSWORD) {
    data.PASSWORD = await bcrypt.hash(data.PASSWORD, 10);
  }

  const updatedNhanVien = await NhanVien.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedNhanVien) {
    throw new ApiError(404, "Không tìm thấy nhân viên để cập nhật");
  }
  
  return { message: "Cập nhật nhân viên thành công", updatedNhanVien };
};

// Xóa nhân viên
const deleteNhanVien = async (id) => {
  const deletedNhanVien = await NhanVien.findByIdAndDelete(id);
  if (!deletedNhanVien) {
    throw new ApiError(404, "Không tìm thấy nhân viên để xóa");
  }
  
  return { message: "Xóa nhân viên- thành công", deletedNhanVien };
};

// Tìm nhân viên theo số điện thoại
const getNhanVienBySDT = async (sdt) => {
  const nhanVien = await NhanVien.findOne({ SODIENTHOAI: sdt });
  if (!nhanVien) {
    throw new ApiError(404, "Không tìm thấy nhân viên với số điện thoại này");
  }
  return nhanVien;
};

const getNhanVienByTen = async (ten) => {
  const nhanViens = await NhanVien.find({ TEN: { $regex: ten, $options: "i" } });
  if (!nhanViens.length) {
    throw new ApiError(404, "Không tìm thấy nhân viên với tên này");
  }
  return nhanViens;
};

module.exports = {
  getAllNhanVien,
  getNhanVienById,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
  getNhanVienBySDT,
  getNhanVienByTen,
};