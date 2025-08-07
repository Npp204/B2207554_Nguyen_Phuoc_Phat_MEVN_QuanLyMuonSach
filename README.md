# 📚 Hệ Thống Quản Lý Mượn Sách (MEVN Stack)

Một ứng dụng web hỗ trợ thư viện hoặc tổ chức quản lý việc mượn và trả sách hiệu quả, được phát triển bằng MEVN Stack:

- **MongoDB** – Cơ sở dữ liệu NoSQL
- **Express.js** – Backend framework trên Node.js
- **Vue.js** – Framework giao diện người dùng
- **Node.js** – Môi trường thực thi JavaScript phía server

---

## 🚀 Tính Năng Chính

- ✅ Đăng ký / Đăng nhập người dùng (JWT)
- ✅ Phân quyền người dùng (admin / người dùng thường)
- ✅ CRUD sách (thêm, sửa, xóa, xem chi tiết)
- ✅ Ghi nhận mượn sách và trả sách
- ✅ Tìm kiếm sách theo tiêu đề, tác giả
- ✅ Tự động xác định trễ hạn, hiển thị cảnh báo
- ✅ Quản lý người dùng và thống kê mượn sách (cho admin)
- ✅ Giao diện thân thiện, dễ sử dụng với Vue 3 + Bootstrap 5

---

## 🏗️ Cấu Trúc Dự Án

project/
├── backend/ # API Express + MongoDB
│ ├── app/
│ │ ├── models/ # Mongoose models (Book, User, BorrowRecord...)
│ │ ├── routes/ # Các route API (RESTful)
│ │ ├── controllers/ # Xử lý logic cho từng API
│ │ ├── middlewares/ # Xác thực, phân quyền, xử lý lỗi
│ │ ├── services/ # Xử lý logic nghiệp vụ (service layer)
│ │ ├── utils/ # Các hàm tiện ích (helper, format date, validate...)
│ │ ├── config/ # Kết nối MongoDB, thiết lập JWT, CORS,...
│ │ ├── uploads/ # Thư mục chứa file ảnh (nếu có upload)
│ └── server.js # Điểm khởi chạy backend
│
├── frontend/ # Giao diện người dùng (Vue.js)
│ ├── src/
│ │ ├── components/ # Component tái sử dụng (Navbar, Table, Modal, ...)
│ │ ├── views/ # Các trang (Home, BookList, AdminPanel, ...)
│ │ ├── router/ # Cấu hình định tuyến Vue Router
│ │ ├── services/ # Gọi API từ frontend (axios)
│ │ ├── assets/ # Ảnh, biểu tượng, CSS, fonts,...
│ │ ├── store/ # Quản lý trạng thái ứng dụng (Vuex)
│ │ └── App.vue # Gốc của ứng dụng Vue
│ └── public/ # Static files
│
└── README.md # Tài liệu hướng dẫn

---

## ⚙️ Cài Đặt & Khởi Chạy Ứng Dụng

### 1. Clone dự án

```
bash
git clone https://github.com/your-username/quan-ly-muon-sach-mevn.git
cd quan-ly-muon-sach-mevn
```

### 2. Thiết lập backend

```
cd backend
npm install
```

# Tạo file .env trong thư mục backend với nội dung mẫu:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/libraryDB
JWT_SECRET=your_jwt_secret_key
```

# Khởi chạy backend:

```
npm start
```

### 3. Thiết lập frontend

```
cd ../frontend
npm install
npm run serve
```

# Truy cập frontend tại: http://localhost:8080

### 🛠️ Yêu Cầu Hệ Thống

    - Node.js >= 16.x
    - MongoDB >= 5.x
    - npm hoặc yarn

### 🔐 Phân Quyền Người Dùng

### 👑 Admin

    - Toàn quyền quản lý sách, người dùng, và thống kê
    - Duyệt và ghi nhận các đơn mượn / trả sách

### 👤 Người Dùng Thường

    - Xem sách và thông tin mượn cá nhân
    - Gửi yêu cầu mượn/trả sách
    - Theo dõi lịch sử mượn

### 📈 Công Nghệ Sử Dụng

# Backend:

    - Node.js + Express.js
    - MongoDB + Mongoose
    - JWT cho xác thực
    - bcrypt để mã hóa mật khẩu
    - Multer cho upload file (nếu có)
    - dotenv, cors, morgan,...

# Frontend:

    - Vue.js 3 + Composition API
    - Vue Router
    - Vuex (hoặc Pinia)
    - Axios
    - Bootstrap 5 / Tailwind CSS (tuỳ cấu hình)

### 👨‍💻 Tác Giả

- **Nguyễn Phước Phát**
- 📧 nguyenphatzx2020@gmail.com
- 🔗 [GitHub](https://github.com/npp204)
