import axios from "axios";

const API_URL = "http://localhost:3000/api/sach";

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const borrowBooks = async (docGiaId, borrowList, ngayMuon) => {
  if (!ngayMuon ) {
    console.error("Lỗi: ngày mượn hoặc ngày trả không hợp lệ", { ngayMuon });
    return Promise.reject(new Error("Ngày mượn và ngày trả không được để trống"));
  }

  const requestData = {
    docGiaId,
    sach: borrowList.map(item => ({
        sachId: item.book._id,
        soLuong: item.quantity
    })),
    ngayMuon,
    };

  try {
    await axios.post("http://localhost:3000/api/muonsach/dangky", requestData);
  } catch (error) {
    console.error("Lỗi khi gọi API mượn sách:", error.response?.data || error.message);
    throw error; 
  }
};

