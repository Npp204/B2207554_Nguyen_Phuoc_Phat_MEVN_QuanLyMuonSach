<style scoped>
.borrow-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #007bff;
}

button {
  margin: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.borrow-form {
  background: white;
  padding: 15px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

select, input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #e9ecef;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  font-size: 14px;
}
</style>

<template>
  <div class="borrow-container">
    <h2 class="text-primary"> Đăng Ký Mượn Sách</h2>

    <button class="btn btn-primary" @click="showBorrowForm = true">
      Thêm Phiếu Mượn
    </button>

    <div v-if="showBorrowForm" class="borrow-form">
      <h3>Phiếu Mượn</h3>
      
      <label for="book">Chọn sách:</label>
      <select v-model="selectedBook" @change="updateAvailableQuantity">
        <option v-for="book in books" :key="book._id" :value="book">
          {{ book.TENSACH }} (Còn: {{ book.SOQUYEN }})
        </option>
      </select>

      <label for="quantity">Số lượng mượn:</label>
      <input type="number" v-model.number="quantity" :max="selectedBook ? selectedBook.SOQUYEN : 1" min="1" />

      <button class="btn btn-success" @click="addToBorrowList">
        Thêm vào danh sách
      </button>

      <button class="btn btn-secondary" @click="showBorrowForm = false">
        Hủy
      </button>

      <div v-if="borrowList.length > 0">
        <h3>Danh Sách Mượn</h3>
        <ul>
          <li v-for="(item, index) in borrowList" :key="index">
            {{ item.book.TENSACH }} - {{ item.quantity }} cuốn
            <button class="btn btn-danger" @click="removeFromBorrowList(index)">Xóa</button>
          </li>
        </ul>

        <button class="btn btn-primary" @click="registerBorrow">Đăng Ký Mượn</button>
        <button @click="cancelBorrow" class="btn-cancel">Hủy Phiếu Mượn</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks, borrowBooks } from "@/services/muonsachService";
import { useStore } from 'vuex';

export default {
  data() {
    const store = useStore(); // Khởi tạo store trong data
    return {
      store, // Lưu store để sử dụng trong computed
      showBorrowForm: false,
      books: [],
      selectedBook: null,
      quantity: 1,
      borrowList: [],
      ngayMuon: "",
    };
  },

  computed: {
    docGiaId() {
      return this.store.state.user._id; // Lấy id từ Vuex store
    },
  },

  methods: {
    async loadBooks() {
      this.books = await getBooks();
    },

    updateAvailableQuantity() {
      this.quantity = 1;
    },

    openBorrowForm() {
      const today = new Date();
      this.ngayMuon = today.toISOString().split("T")[0];
    },

    addToBorrowList() {
      if (!this.selectedBook || !this.selectedBook.TENSACH || this.quantity < 1) {
        alert("Vui lòng chọn sách hợp lệ và nhập số lượng!");
        return;
      }

      const existing = this.borrowList.find(item => item.book._id === this.selectedBook._id);
      if (existing) {
        existing.quantity += this.quantity;
      } else {
        this.borrowList.push({ book: this.selectedBook, quantity: this.quantity });
      }
      console.log("borrowList:", JSON.stringify(this.borrowList, null, 2));
    },

    removeFromBorrowList(index) {
      this.borrowList.splice(index, 1);
    },

    async registerBorrow() {
      this.openBorrowForm(); // Gọi để cập nhật ngày mượn

      if (this.borrowList.length === 0) {
        alert("Danh sách mượn trống!");
        return;
      }

      try {
        await borrowBooks(this.docGiaId, this.borrowList, this.ngayMuon);
        alert("Đăng ký mượn thành công! Vui lòng chờ duyệt.");
        this.borrowList = [];
        this.selectedBook = null;
        this.quantity = 1;
        this.showBorrowForm = false;
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi không xác định!");
        console.error(error);
      }
    },

    cancelBorrow() {
      this.borrowList = [];
      this.selectedBook = null;
      this.quantity = 1;
    },
  },

  mounted() {
    this.loadBooks(); // Tải danh sách sách khi component được mount
  },
};
</script>
