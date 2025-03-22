<style scoped>
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #b89e25;
  }

  .docgia-list {
    padding: 20px;
  }

  .page-size {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
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
  <div class="docgia-list">
    <h2>Danh sách độc giả</h2>

    <InputSearch v-model="search" />

    <div class="page-size mb-2">
      <label for="pageSize">Hiển thị:</label>
      <select v-model="perPage" id="pageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <span>độc giả / trang</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Họ tên</th>
          <th>Số điện thoại</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="docgia in paginatedDocGias" :key="docgia._id">
          <td>{{ docgia.HOLOT }} {{ docgia.TEN }}</td>
          <td>{{ docgia.SODIENTHOAI }}</td>
          <td>
            <button
              class="delete-btn"
              @click="$emit('deleteDocGia', docgia._id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
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
      docGias: { type: Array, required: true }
    },
    data() {
      return {
        currentPage: 1,
        perPage: 5,
        search: ''
      }
    },
    computed: {
      filteredDocGias() {
        const keyword = this.search.toLowerCase().trim()
        return this.docGias.filter(docgia => {
          const hoTen = `${docgia.HOLOT} ${docgia.TEN}`.toLowerCase()
          const soDienThoai = docgia.SODIENTHOAI
            ? docgia.SODIENTHOAI.toLowerCase()
            : ''

          return hoTen.includes(keyword) || soDienThoai.includes(keyword)
        })
      },
      totalPages() {
        return Math.ceil(this.docGias.length / this.perPage)
      },
      paginatedDocGias() {
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage
        return this.filteredDocGias.slice(start, end)
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
