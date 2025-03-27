<template>
  <div>
    <TheoDoiMuonList 
      :danhSachDonMuon="danhSachDonMuon" 
      @duyetMuon="duyetMuon" 
      @xacNhanTra="xacNhanTra"
      @xoaDonMuon="xoaDonMuon"
    />
  </div>
</template>

<script>
import TheoDoiMuonList from "@/components/TheoDoiMuonList.vue";
import axios from "axios";

export default {
  components: { TheoDoiMuonList },
  data() {
    return {
      danhSachDonMuon: [],
    };
  },
  mounted() {
    this.loadDanhSachMuon();
  },
  methods: {
    async loadDanhSachMuon() {
      try {
        const res = await axios.get("http://localhost:3000/api/theodoimuonsach");
        console.log(res.data)
        this.danhSachDonMuon = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn mượn:", error);
      }
    },
    async duyetMuon(don) {
      try {
        await axios.put(`http://localhost:3000/api/muonsach/duyet/${don._id}`);
        this.loadDanhSachMuon();
      } catch (error) {
        alert(`${error.response.data.message || "Có lỗi xảy ra!"}`);
        console.error("Lỗi khi duyệt mượn:", error);
      }
    },
    async xacNhanTra(don) {
      try {
        await axios.put(`http://localhost:3000/api/muonsach/tra/${don._id}`);
        this.loadDanhSachMuon();
      } catch (error) {
        console.error("Lỗi khi xác nhận trả:", error);
      }
    },
    async xoaDonMuon(don) {
        if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) return;

        try {
        await axios.delete(`http://localhost:3000/api/theodoimuonsach/${don._id}`);
        this.danhSachDonMuon = this.danhSachDonMuon.filter(item => item._id !== don._id);
        alert("Xóa thành công!");
        } catch (error) {
        console.error("Lỗi khi xóa yêu cầu:", error);
        alert("Xóa không thành công!");
        }
    },
  }
};
</script>
