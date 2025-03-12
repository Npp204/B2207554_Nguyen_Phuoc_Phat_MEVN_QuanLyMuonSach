const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ảnh sẽ được lưu trong thư mục 'uploads/'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file theo timestamp
  },
});

// Kiểm tra loại file (chỉ chấp nhận JPG, PNG, JPEG)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh (JPG, PNG)"), false);
  }
};

// Giới hạn kích thước file (tối đa 5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
