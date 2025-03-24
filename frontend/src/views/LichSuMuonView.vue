<style scoped>
  h2 {
    color: #5a4631;
  }

  .text-warning {
    color: rgb(220, 11, 11);
  }
  .text-primary {
    color: blue;
  }
  .text-success {
    color: green;
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
  <div class="container mt-4">
    <h2 class="mb-3">Lịch sử mượn sách</h2>

    <InputSearch v-model="search" />

    <div class="page-size mb-2">
      <label for="pageSize">Hiển thị:</label>
      <select v-model="perPage" id="pageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <span>phiếu / trang</span>
    </div>

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
        <tr v-for="m in paginatedLichSuMuon" :key="m._id">
          <td>{{ m.MASACH?.TENSACH || 'Không có thông tin' }}</td>
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

    <div class="pagination mt-3">
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
  import axios from 'axios'
  import InputSearch from '@/components/InputSearch.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: { InputSearch },
    data() {
      return {
        lichSuMuon: [],
        currentPage: 1,
        perPage: 5,
        search: ''
      }
    },
    computed: {
      ...mapGetters(['getUser']),
      filteredLichSuMuon() {
        const keyword = this.search.toLowerCase().trim()

        return this.lichSuMuon.filter(m => {
          const tenSach = m.MASACH?.TENSACH?.toLowerCase() || ''
          const ngayMuon = this.formatDate(m.NGAYMUON).toLowerCase() 
          const ngayTra = this.formatNgay(m.NGAYTRA).toLowerCase() 
          const trangThai = m.TRANGTHAI.toLowerCase() 

          return (
            tenSach.includes(keyword) ||
            ngayMuon.includes(keyword) ||
            ngayTra.includes(keyword) ||
            trangThai.includes(keyword)
          )
        })
      },
      totalPages() {
        return Math.ceil(this.filteredLichSuMuon.length / this.perPage)
      },
      paginatedLichSuMuon() {
        const start = (this.currentPage - 1) * this.perPage
        return this.filteredLichSuMuon.slice(start, start + this.perPage)
      }
    },
    methods: {
      async getLichSuMuon() {
        if (!this.getUser) return

        try {
          const res = await axios.get(
            'http://localhost:3000/api/theodoimuonsach'
          )
          this.lichSuMuon = res.data.filter(
            m => String(m.MADOCGIA?._id) === String(this.getUser._id)
          )
        } catch (error) {
          console.error('Lỗi khi lấy lịch sử mượn sách:', error)
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('vi-VN')
      },
      getStatusClass(status) {
        return {
          'text-warning': status === 'Chờ duyệt',
          'text-primary': status === 'Đang mượn',
          'text-success': status === 'Đã trả'
        }
      },
      formatNgay(ngay) {
        if (!ngay) return 'Chưa trả'
        return new Date(ngay).toLocaleDateString('vi-VN')
      },
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
    mounted() {
      this.getLichSuMuon()
    },
    watch: {
      perPage() {
        this.currentPage = 1
      }
    }
  }
</script>
