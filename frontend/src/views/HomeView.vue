<style scoped>
.card {
  max-width: 500px;
  margin: auto;
  border-radius: 15px;
}

.sach-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 cột */
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
}

</style>

<template>
  <div class="container text-center mt-5">
    <div class="card shadow-lg p-4">
      <h1 class="text-primary fw-bold">Trang Chủ</h1>
      <p class="lead">Chào mừng bạn đến với hệ thống quản lý mượn sách!</p>
      <button class="btn btn-success">Bắt đầu ngay</button>
    </div>
    <div class="sach-list">
        <SachCard v-for="sach in sachList" :key="sach.MASACH" :sach="sach" />
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SachCard from "@/components/SachCard.vue";
import axios from "axios";

const sachList = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/sach");
    sachList.value = response.data;
    //console.log("Dữ liệu sách:", JSON.parse(JSON.stringify(sachList.value)));
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sách:", error);
  }
});
</script>
