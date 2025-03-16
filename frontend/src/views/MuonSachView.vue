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
    <h2>Mượn Sách</h2>

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

<script setup>
import { ref, onMounted, computed } from "vue";
import { getBooks, borrowBooks } from "@/services/muonsachService";
import { useStore } from 'vuex'

const store = useStore()

const showBorrowForm = ref(false);
const books = ref([]); 
const selectedBook = ref(null);
const quantity = ref(1); 
const borrowList = ref([]); 
const ngayMuon = ref("");
const docGiaId = computed(() => store.state.user.id);

onMounted(async () => {
  books.value = await getBooks();
});

const updateAvailableQuantity = () => {
  quantity.value = 1;
};

const openBorrowForm = () => {
  const today = new Date();

  ngayMuon.value = today.toISOString().split("T")[0];
};


const addToBorrowList = () => {
  if (!selectedBook.value || !selectedBook.value.TENSACH || quantity.value < 1) {
    alert("Vui lòng chọn sách hợp lệ và nhập số lượng!");
    return;
  }

  const existing = borrowList.value.find(item => item.book._id === selectedBook.value._id);
  if (existing) {
    existing.quantity += quantity.value;
  } else {
    borrowList.value.push({ book: selectedBook.value, quantity: quantity.value });
  }
  console.log("borrowList.value:", JSON.stringify(borrowList.value, null, 2));
};

const removeFromBorrowList = (index) => {
  borrowList.value.splice(index, 1);
};

const registerBorrow = async () => {
  openBorrowForm();

  if (borrowList.value.length === 0) {
    alert("Danh sách mượn trống!");
    return;
  }

  try {
    await borrowBooks(docGiaId.value, borrowList.value, ngayMuon.value);
    alert("Đăng ký mượn thành công! Vui lòng chờ duyệt.");
    borrowList.value = [];
    selectedBook.value = null;
    quantity.value = 1;
    showBorrowForm.value = false; 
  } catch (error) {
    alert("Có lỗi xảy ra!");
    console.error(error);
  }
};

const cancelBorrow = () => {
  borrowList.value = []; 
  selectedBook.value = null;
  quantity.value = 1;
};
</script>


