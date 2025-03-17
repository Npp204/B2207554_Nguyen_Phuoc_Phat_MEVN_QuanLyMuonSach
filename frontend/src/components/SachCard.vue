<template>
  <div class="sach-card">
    <img :src="sach.HINHANH ? `http://localhost:3000${sach.HINHANH}` : 'https://via.placeholder.com/150'" alt="Hình ảnh sách" class="img-fluid rounded">


    <div class="sach-info">
      <h2 class="sach-title">{{ sach.TENSACH }}</h2>
      <p class="sach-author">Tác giả: {{ sach.NGUONGOC_TACGIA || "Không rõ" }}</p>
      <p class="sach-year">Năm XB: {{ sach.NAMXUATBAN || "Không rõ" }}</p>
      <p class="sach-price">Giá: {{ formatPrice(sach.DONGIA) }}</p>
      <p class="sach-stock" :class="{ 'out-of-stock': sach.SOQUYEN === 0 }">
        {{ sach.SOQUYEN > 0 ? `Còn lại: ${sach.SOQUYEN} quyển` : "Hết sách" }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  sach: Object
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};
</script>

<style scoped>
.sach-card {
  width: 250px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 15px;
  transition: transform 0.2s ease-in-out;
}

.sach-card:hover {
  transform: scale(1.05);
}

.sach-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.sach-info {
  padding: 10px 0;
}

.sach-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.sach-author, .sach-year, .sach-price, .sach-stock {
  font-size: 14px;
  color: #555;
  margin: 5px 0;
}

.sach-stock.out-of-stock {
  color: red;
  font-weight: bold;
}
</style>
