import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function getUserInfo(userId, role) {
    try {
        let apiUrl;
        if (role === "nhanvien" || role === "quanly") {
            apiUrl = `/api/nhanvien/${userId}`;
        } else {
            apiUrl = `/api/docgia/${userId}`;
        }
        
        console.log("Gọi API:", `${API_BASE}${apiUrl}`);
        
        const response = await axios.get(`${API_BASE}${apiUrl}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
        return null;
    }
}

// Cập nhật thông tin tài khoản
export async function updateUserInfo(role, userId, userData) {
    try {
        let apiUrl;
        if (role === "nhanvien" || role === "quanly") {
            apiUrl = `/api/nhanvien/${userId}`;
        } else {
            apiUrl = `/api/docgia/${userId}`;
        } 
       
        const response = await axios.put(`${API_BASE}${apiUrl}`, userData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        return null;
    }
}




