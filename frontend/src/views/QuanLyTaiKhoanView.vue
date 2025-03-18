<style scoped>
  .quanly-acc {
    padding: 20px;
  }

  .buttons {
    margin-bottom: 20px;
  }

  button {
    padding: 8px 15px;
    margin: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  button:first-child {
    background: #4caf50;
    color: white;
  }

  button:last-child {
    background: #2196f3;
    color: white;
  }
</style>

<template>
  <div class="quanly-acc">
    <h1>Quản lý tài khoản</h1>

    <div class="buttons">
      <button @click="activeTab = 'docgia'">Danh sách Độc giả</button>
      <button @click="activeTab = 'nhanvien'">Danh sách Nhân viên</button>
      <button @click="showNhanVienForm = true">Thêm nhân viên</button>
    </div>
    <NhanVienForm
      v-if="showNhanVienForm"
      @submit="addNhanVien"
      @cancel="showNhanVienForm = false"
    />
    <DocGiaList
      v-if="activeTab === 'docgia'"
      :docGias="docGias"
      @deleteDocGia="deleteDocGia"
    />
    <NhanVienList
      v-if="activeTab === 'nhanvien'"
      :nhanViens="nhanViens"
      @deleteNhanVien="deleteNhanVien"
    />
  </div>
</template>

<script>
  import axios from 'axios'
  import DocGiaList from '@/components/DocGiaList.vue'
  import NhanVienList from '@/components/NhanVienList.vue'
  import NhanVienForm from '@/components/NhanVienForm.vue'

  export default {
    components: { DocGiaList, NhanVienList, NhanVienForm },
    data() {
      return {
        activeTab: 'docgia',
        docGias: [],
        nhanViens: [],
        showNhanVienForm: false
      }
    },
    async created() {
      await this.fetchDocGias()
      await this.fetchNhanViens()
    },
    methods: {
      async fetchDocGias() {
        try {
          const response = await axios.get('http://localhost:3000/api/docgia')
          this.docGias = response.data.map(docGia => docGia._doc || docGia)
          //console.log("Dữ liệu nhận được",JSON.stringify(this.docGias, null, 2));
        } catch (error) {
          console.error('Lỗi khi tải danh sách độc giả:', error)
        }
      },
      async fetchNhanViens() {
        try {
          const response = await axios.get('http://localhost:3000/api/nhanvien')
          this.nhanViens = response.data
        } catch (error) {
          console.error('Lỗi khi tải danh sách nhân viên:', error)
        }
      },
      async deleteDocGia(id) {
        if (confirm('Bạn có chắc muốn xóa độc giả này?')) {
          try {
            await axios.delete(`http://localhost:3000/api/docgia/${id}`)
            this.docGias = this.docGias.filter(docgia => docgia._id !== id)
            alert('Xóa độc giả thành công!')
          } catch (error) {
            console.error('Lỗi khi xóa độc giả:', error)
          }
        }
      },
      async deleteNhanVien(id) {
        if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
          try {
            await axios.delete(`http://localhost:3000/api/nhanvien/${id}`)
            this.nhanViens = this.nhanViens.filter(
              nhanvien => nhanvien._id !== id
            )
            alert('Xóa nhân viên thành công!')
          } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error)
          }
        }
      },
      async addNhanVien(nhanvien) {
        try {
          //console.log("Dữ liệu gửi đi",JSON.stringify(nhanvien, null, 2));
          const response = await axios.post(
            'http://localhost:3000/api/auth/register/nhanvien',
            nhanvien
          )
          //console.log("Dữ liệu nhận được",JSON.stringify(response.data, null, 2));
          await this.fetchNhanViens()
          alert('Thêm nhân viên thành công!')
          this.showNhanVienForm = false
        } catch (error) {
          this.showNhanVienForm = false
          alert(error.response.data?.message || 'Lỗi khi thêm nhân viên!')
        }
      }
    }
  }
</script>
