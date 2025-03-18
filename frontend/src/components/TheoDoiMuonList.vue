<style scoped>
.borrow-list {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background: #f4f4f4;
}

th:last-child, td:last-child {
  width: 120px;
  text-align: center;
  padding: 5px;
}

button {
  padding: 3px 8px;
  margin: 2px;
  font-size: 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  opacity: 0.8;
}

</style>

<template>
  <div class="borrow-list">
    <h2>Theo dõi mượn sách</h2>

    <table>
      <thead>
        <tr>
          <th>Người mượn</th>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="don in danhSachDonMuon" :key="don._id">
          <td>{{ loadHoTen(don.MADOCGIA) }}</td>
          <td>{{ loadSach(don.MASACH) }}</td>
          <td>{{ formatDate(don.NGAYMUON) }}</td>
          <td>{{ formatNgay(don.NGAYTRA) }}</td>
          <td>{{ don.TRANGTHAI }}</td>
          <td>
            <button style="background: #4CAF50; color: white;" v-if="don.TRANGTHAI === 'Chờ duyệt'" @click="$emit('duyetMuon', don)">Duyệt</button>
            <button style="background: #f44336; color: white;" v-if="don.TRANGTHAI === 'Đang mượn'" @click="$emit('xacNhanTra', don)">Trả</button>
            <button style="background: #ff9800; color: white;" @click="$emit('xoaDonMuon', don)">Xóa</button> <!-- Nút Xóa -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    danhSachDonMuon: Array,
  },
  methods: {
    loadHoTen(docGia) {
      if (!docGia || typeof docGia !== "object") return "Không tìm thấy";
      return `${docGia.HOLOT} ${docGia.TEN}`;
    },
    loadSach(maSach) {
      if (!maSach || typeof maSach !== "object") return "Không tìm thấy";
    return `${maSach.TENSACH}`; 
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
    },
    formatNgay(ngay) {
      if (!ngay) return "Chưa trả"; 
      return new Date(ngay).toLocaleDateString("vi-VN"); 
    },
  }
};
</script>


