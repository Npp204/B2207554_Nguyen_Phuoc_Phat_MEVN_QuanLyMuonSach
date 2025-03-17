require("dotenv").config(); // Nạp biến môi trường từ .env

const config = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/quanlymuonsach"
    },

    jwt: {
        secret: process.env.JWT_SECRET || "SECRET_KET"
    }
};

module.exports = config;
