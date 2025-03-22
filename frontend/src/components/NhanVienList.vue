<style scoped>
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #b89e25;
  }

  .nhanvien-list {
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background: #f4f4f4;
  }

  th:last-child,
  td:last-child {
    width: 120px;
    text-align: center;
    padding: 5px;
  }

  .delete-btn {
    background: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 10px;
  }

  .pagination button {
    padding: 5px 10px;
    border: none;
    background-color: #b89e25;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .page-size {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .page-size label {
    margin-right: 10px;
    font-weight: bold;
  }

  .page-size select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
  }

  .page-size span {
    margin-left: 10px;
    font-size: 14px;
    color: #555;
  }
</style>

<template>
  <div class="nhanvien-list">
    <h2>Danh sách nhân viên</h2>

    <InputSearch v-model="search" />

    <div class="page-size mb-2">
      <label for="pageSize">Hiển thị:</label>
      <select v-model="perPage" id="pageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <span>nhân viên / trang</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Họ tên</th>
          <th>Số điện thoại</th>
          <th>Chức vụ</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhanvien in paginatedNhanViens" :key="nhanvien._id">
          <td>{{ nhanvien.HOTENNV }}</td>
          <td>{{ nhanvien.SODIENTHOAI }}</td>
          <td>
            {{ nhanvien.CHUCVU === 'QuanLyThuVien' ? 'Quản lý' : 'Nhân viên' }}
          </td>
          <td>
            <button
              class="delete-btn"
              @click="$emit('deleteNhanVien', nhanvien._id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="bi bi-chevron-left"></i>
        Trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Sau
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import InputSearch from '@/components/InputSearch.vue'

  export default {
    components: { InputSearch },
    props: {
      nhanViens: { type: Array, required: true }
    },
    data() {
      return {
        currentPage: 1,
        perPage: 5,
        search: ''
      }
    },
    computed: {
      filteredNhanViens() {
        const keyword = this.search.toLowerCase().trim()
        return this.nhanViens.filter(nhanvien => {
          const hoTen = nhanvien.HOTENNV ? nhanvien.HOTENNV.toLowerCase() : ''
          const soDienThoai = nhanvien.SODIENTHOAI
            ? nhanvien.SODIENTHOAI.toLowerCase()
            : ''
          const chucVu =
            nhanvien.CHUCVU === 'QuanLyThuVien' ? 'quản lý' : 'nhân viên'

          return (
            hoTen.includes(keyword) ||
            soDienThoai.includes(keyword) ||
            chucVu.includes(keyword)
          )
        })
      },
      totalPages() {
        return Math.ceil(this.nhanViens.length / this.perPage)
      },
      paginatedNhanViens() {
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage
        return this.filteredNhanViens.slice(start, end)
      }
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
        }
      }
    },
    watch: {
      perPage() {
        this.currentPage = 1
      }
    }
  }
</script>
