import axios from "axios";

const API_URL = "http://localhost:3000/api/nhaxuatban"; // Đổi theo API backend

// Lấy danh sách nhà xuất bản
export const fetchNXB = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải danh sách nhà xuất bản:", error);
        throw error;
    }
};

export const createNXB = async (nxbData) => {
    try {
        const response = await axios.post(API_URL, nxbData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm nhà xuất bản:", error);
        throw error;
    }
};
