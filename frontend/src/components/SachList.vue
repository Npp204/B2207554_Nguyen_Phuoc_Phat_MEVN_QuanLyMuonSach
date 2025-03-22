<style scoped>
  .table {
    margin-top: 10px;
    text-align: center;
  }
  th,
  td {
    vertical-align: middle;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination button {
    padding: 8px 12px;
    margin: 5px;
    border: none;
    background: #b89e25;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }

  .pagination button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .pagination span {
    margin: 15px;
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
  <div class="page-size mb-2">
    <label for="pageSize">Hiển thị:</label>
    <select v-model="perPage" id="pageSize">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <span>sách / trang</span>
  </div>

  <div>
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>Mã Sách</th>
          <th>Tên Sách</th>
          <th>Tác giả</th>
          <th>Nhà Xuất Bản</th>
          <th>Số Lượng</th>
          <th>Đơn Giá</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in paginatedBooks" :key="book._id">
          <td>{{ book.MASACH || 'Không có mã' }}</td>
          <td>{{ book.TENSACH || 'Không có tên' }}</td>
          <td>{{ book.NGUONGOC_TACGIA || 'Không có tên' }}</td>
          <td>{{ getNXBName(book.MANXB) }}</td>
          <td>
            {{ book.SOQUYEN !== undefined ? book.SOQUYEN : 'Không có dữ liệu' }}
          </td>
          <td>{{ formatCurrency(book.DONGIA) }}</td>
          <td>
            <div class="button-group">
              <button
                class="btn btn-warning btn-sm mx-1"
                @click="$emit('edit', book)"
              >
                Sửa
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="$emit('delete', book._id)"
              >
                Xóa
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="bi bi-chevron-left"></i>
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      books: { type: Array, required: true },
      nxbs: { type: Array, required: true }
    },
    data() {
      return {
        currentPage: 1,
        perPage: 10
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.books.length / this.perPage)
      },
      paginatedBooks() {
        const start = (this.currentPage - 1) * this.perPage
        return this.books.slice(start, start + this.perPage)
      }
    },
    emits: ['edit', 'delete'],
    methods: {
      prevPage() {
        if (this.currentPage > 1) this.currentPage--
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++
      },
      getNXBName(book) {
        if (!book || !book.MANXB) return 'Chưa có NXB'

        const manxb =
          typeof book.MANXB === 'object' ? book.MANXB.MANXB : book.MANXB

        const nxb = this.nxbs.find(
          n =>
            n.MANXB === manxb ||
            n._id === manxb ||
            String(n._id) === String(manxb)
        )
        return nxb ? nxb.TENNXB : 'Không tìm thấy'
      },
      formatCurrency(value) {
        if (value == null || isNaN(value)) return 'Không có giá'
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(value)
      }
    },
    watch: {
      perPage() {
        this.currentPage = 1
      }
    }
  }
</script>
