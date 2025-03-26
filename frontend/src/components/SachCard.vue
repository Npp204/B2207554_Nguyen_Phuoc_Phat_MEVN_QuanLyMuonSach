<!-- <style scoped>
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
</style> -->

<style scoped>
.sach-card {
  width: 275px;
  background: linear-gradient(to bottom, #fff8e1, #fff);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  text-align: center;
  padding: 15px;
  transition: all 0.3s ease-in-out;
  border: 2px solid #f4c542;
  position: relative;
}

.sach-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: #e8a200;
}

.sach-image {
  width: 100%;
  aspect-ratio: 4 / 6;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.sach-card:hover .sach-image {
  transform: scale(1.05);
}

.sach-info {
  padding: 12px 0;
}

.sach-title {
  font-size: 18px;
  font-weight: bold;
  color: #3e2723;
  margin-bottom: 5px;
}

.sach-author,
.sach-year,
.sach-price,
.sach-stock,
.sach-publisher {
  font-size: 15px;
  color: #5d4037;
  margin: 6px 0;
}

.sach-stock.out-of-stock {
  color: red;
  font-weight: bold;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff6f00;
  color: white;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
}

.sach-card:hover .badge {
  background: #ff8f00;
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


