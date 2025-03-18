import axios from "axios";

const API_URL = "http://localhost:3000/api/sach";

export const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        //console.log("API trả về danh sách sách:", JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải sách:", error.response?.data || error.message);
        throw error;
    }
};

export async function createBook(book) {
    const formData = new FormData();
    
    formData.append("MASACH", book.MASACH);
    formData.append("TENSACH", book.TENSACH);
    formData.append("MANXB", book.MANXB);
    formData.append("SOQUYEN", book.SOQUYEN);
    formData.append("DONGIA", book.DONGIA);
    formData.append("NAMXUATBAN", book.NAMXUATBAN);
    formData.append("NGUONGOC_TACGIA", book.NGUONGOC_TACGIA);
    if (book.HINHANH) {
        formData.append("HINHANH", book.HINHANH); 
    }

    try {
        //console.log("Dữ liệu gửi lên server:", formData);
        const response = await axios.post(API_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        //console.log("Dữ liệu từ API", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm sách:", error.response?.data || error.message);
        throw error;
    }
}

export async function updateBook(book) {
    const formData = new FormData();
    formData.append("MASACH", book.MASACH);
    formData.append("TENSACH", book.TENSACH);
    formData.append("MANXB", book.MANXB);
    formData.append("SOQUYEN", book.SOQUYEN);
    formData.append("DONGIA", book.DONGIA);
    formData.append("NAMXUATBAN", book.NAMXUATBAN);
    formData.append("NGUONGOC_TACGIA", book.NGUONGOC_TACGIA);
    if (book.HINHANH) {
        formData.append("HINHANH", book.HINHANH); 
    }

    try {
        const response = await axios.put(`${API_URL}/${book._id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error.response?.data || error.message);
        throw error;
    }
}

export async function deleteBook(bookId) {
    try {
        if (!bookId || typeof bookId !== "string") {
            throw new Error("ID sách không hợp lệ");
        }

        const exists = await checkBookExists(bookId);
        if (!exists) {
            throw new Error("Sách không tồn tại hoặc đã bị xóa trước đó");
        }

        await axios.delete(`${API_URL}/${bookId}`);
        console.log("Xóa sách thành công!");
    } catch (error) {
        console.error("Lỗi khi xóa sách:", error.response?.data || error.message);
        throw error;
    }
}

async function checkBookExists(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data !== null;
    } catch (error) {
        return false;
    }
}