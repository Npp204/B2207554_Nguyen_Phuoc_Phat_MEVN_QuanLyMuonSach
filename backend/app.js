const express = require("express");
const cors = require("cors");

const sachRouter = require("./app/routes/sach.route");
const docgiaRouter = require('./app/routes/docgia.route');
const nhanVienRouter = require('./app/routes/nhanvien.route');
const nhaxuatbanRoutes = require("./app/routes/nhaxuatban.route");
const theodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");
const authRoutes = require("./app/routes/auth.route");
const muonSachRoutes = require("./app/routes/muonsach.route");
const path = require("path");

const { errorHandler, notFoundHandler } = require("./app/middlewares/error.middleware"); 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

app.use("/api/sach", sachRouter);
app.use('/api/docgia', docgiaRouter);
app.use('/api/nhanvien', nhanVienRouter);
app.use("/api/nhaxuatban", nhaxuatbanRoutes);
app.use("/api/theodoimuonsach", theodoimuonsachRouter);
app.use("/api/auth", authRoutes);
app.use("/api/muonsach", muonSachRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;