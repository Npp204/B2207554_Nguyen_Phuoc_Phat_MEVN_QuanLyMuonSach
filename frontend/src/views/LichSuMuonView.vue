<template>
  <div class="container mt-4">
    <h2 class="mb-3 text-primary">Lịch sử mượn sách</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Số lượng</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in lichSuMuon" :key="m._id">
          <td>{{ m.MASACH?.TENSACH || "Không có thông tin" }}</td>
          <td>{{ formatDate(m.NGAYMUON) }}</td>
          <td>{{ formatNgay(m.NGAYTRA) }}</td>
          <td>{{ m.SOQUYEN }}</td>
          <td>
            <span :class="getStatusClass(m.TRANGTHAI)">
              {{ m.TRANGTHAI }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      lichSuMuon: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]), 
  },
  methods: {
    async getLichSuMuon() {
      if (!this.getUser) return; 
      //console.log("Dữ liệu user trong Vuex:", this.$store.state.user);
      //console.log("Số điện thoại từ Vuex (MADOCGIA):", this.getUser);
      try {
        const res = await axios.get("http://localhost:3000/api/theodoimuonsach"); 
        //console.log("Dữ liệu API trả về:", res.data);
        this.lichSuMuon = res.data.filter(m => String(m.MADOCGIA?._id) === String(this.getUser._id)); // Lọc theo ID độc giả
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử mượn sách:", error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    },
    getStatusClass(status) {
      return {
        "text-warning": status === "Chờ duyệt",
        "text-primary": status === "Đang mượn",
        "text-success": status === "Đã trả",
      };
    },
    formatNgay(ngay) {
      if (!ngay) return "Chưa trả"; // Xử lý null
      return new Date(ngay).toLocaleDateString("vi-VN"); // Format ngày
    }
  },
  mounted() {
    this.getLichSuMuon();
  },
};
</script>

<style>
.text-warning {
  color: orange;
}
.text-primary {
  color: blue;
}
.text-success {
  color: green;
}
</style>