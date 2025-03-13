import axios from "axios";

const API_URL = "http://localhost:3000/api/sach";

export const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải sách:", error.response?.data || error.message);
        throw error;
    }
};

export async function createBook(book) {
    const response = await axios.post(API_URL, book);
    return response.data;
}

export async function updateBook(book) {
    await axios.put(`${API_URL}/${book._id}`, book);
}

export async function deleteBook(bookId) {
    try {
        // Kiểm tra ID có hợp lệ không
        if (!bookId || typeof bookId !== "string") {
            throw new Error("ID sách không hợp lệ");
        }

        // Kiểm tra sách có tồn tại trước khi xóa
        const exists = await checkBookExists(bookId);
        if (!exists) {
            throw new Error("Sách không tồn tại hoặc đã bị xóa trước đó");
        }

        // Nếu sách tồn tại, tiến hành xóa
        await axios.delete(`${API_URL}/${bookId}`);
        console.log("Xóa sách thành công!");
    } catch (error) {
        console.error("Lỗi khi xóa sách:", error.response?.data || error.message);
        throw error;
    }
}


async function checkBookExists(id) {
    try {
        const response = await axios.get(`http://localhost:3000/api/sach/${id}`);
        return response.data !== null; // Trả về true nếu sách tồn tại
    } catch (error) {
        return false; // Nếu lỗi, có thể do sách không tồn tại
    }
}
