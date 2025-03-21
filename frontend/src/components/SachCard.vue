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
  aspect-ratio: 4 / 5;
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

.sach-author, .sach-year, .sach-price, .sach-stock, .sach-publisher {
  font-size: 12pt;
  color: #555;
  margin: 5px 0;
}

.sach-stock.out-of-stock {
  color: red;
  font-weight: bold;
}
</style>

<template>
  <div class="sach-card">
    <img :src= "`http://localhost:3000${sach.HINHANH}`" alt="Hình ảnh sách" class="sach-image">

    <div class="sach-info">
      <h2 class="sach-title">{{ sach.TENSACH }}</h2>
      <p class="sach-author"><strong>Tác giả:</strong> {{ sach.NGUONGOC_TACGIA || "Không rõ" }}</p>
      <p class="sach-year"><strong>Năm Xuất Bản:</strong> {{ sach.NAMXUATBAN || "Không rõ" }}</p>
      <p class="sach-publisher"><strong>{{ getNXBName(sach.MANXB) || "Không rõ" }}</strong></p>
      <p class="sach-price"><strong>Giá:</strong> {{ formatPrice(sach.DONGIA) }}</p>
      <p class="sach-stock" :class="{ 'out-of-stock': sach.SOQUYEN === 0 }">
        <strong v-if="sach.SOQUYEN > 0">Số quyển:</strong> {{ sach.SOQUYEN > 0 ? `${sach.SOQUYEN} quyển` : 'Hết sách' }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sach: Object,
    nxbs: Object
  },
  methods: {
    getNXBName(book) {
        if (!book || !book.MANXB) return "Chưa có NXB";

        const manxb = typeof book.MANXB === "object" ? book.MANXB.MANXB : book.MANXB; 
            
        const nxb = this.nxbs.find(n => 
            n.MANXB === manxb || 
            n._id === manxb || 
            String(n._id) === String(manxb) 
        );
        return nxb ? nxb.TENNXB : "Không tìm thấy";
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(price);
    }
  }
};
</script>


