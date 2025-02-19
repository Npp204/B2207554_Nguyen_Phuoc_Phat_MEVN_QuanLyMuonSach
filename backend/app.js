const express = require("express");
const cors = require("cors");

const contactsRouter = require("./app/routes/contact.route");
const sachRouter = require("./app/routes/sach.route");
const docgiaRouter = require('./app/routes/docgia.route');
const nhanVienRouter = require('./app/routes/nhanvien.route');
const nhaxuatbanRoutes = require("./app/routes/nhaxuatban.route");
const theodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");
const authRoutes = require("./app/routes/auth.route");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

app.use("/api/contacts", contactsRouter);
app.use("/api/sach", sachRouter);
app.use('/api/docgia', docgiaRouter);
app.use('/api/nhanvien', nhanVienRouter);
app.use("/api/nhaxuatban", nhaxuatbanRoutes);
app.use("/api/theodoimuonsach", theodoimuonsachRouter);
app.use("/api/auth", authRoutes);


//handle 404 response
app.use((req, res, next) => {
    //Code ở đây sẽ chạy khi không có route được định nhĩa nào
    //khớp với yêu cầu. Gọi nex() để chuyển đến middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) =>{
    //Middleware xử lý lỗi tập trung.
    //Trong các đoạn xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;