<!-- <style scoped>
  .sach-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 24px;
    border-radius: 8px;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: start;
  }
  .sach-image {
    border-radius: 8px;
    width: 20%;
    height: auto;
    margin: 0 20px 0 0;
  }
  .sach-info {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: auto;
  }

  .btn {
    padding: 8px 16px;
    background-color: #d4edda;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  .btn:hover {
    background-color: #c3e6cb;
  }

  .out-of-stock {
    color: red;
  }
</style> -->

<style scoped>
  .sach-card {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    background: #fff;
    padding: 24px;
    margin: 40px auto;
    border-radius: 12px;
    max-width: 1000px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .sach-card:hover {
    transform: translateY(-4px);
  }

  .sach-image {
    width: 200px;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .sach-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sach-info h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: #333;
  }

  .sach-info p {
    margin-bottom: 12px;
    color: #555;
    line-height: 1.6;
  }

  .btn {
    align-self: start;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .btn:hover {
    background-color: #43a047;
  }

  .sach-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 14%;
    align-items: flex-end;
    flex-shrink: 0;
  }

  .out-of-stock {
    color: #e53935;
    font-weight: bold;
  }
</style>

<template>
  <div v-if="sach" class="sach-card">
    <img
      :src="`http://localhost:3000${sach.HINHANH}`"
      alt="Hình ảnh sách"
      class="sach-image"
    />

    <div class="sach-info">
      <h2 class="sach-title">{{ sach.TENSACH }}</h2>
      <p class="sach-author">
        <strong>Tác giả:</strong>
        {{ sach.NGUONGOC_TACGIA || 'Không rõ' }}
      </p>
      <p class="sach-year">
        <strong>Năm Xuất Bản:</strong>
        {{ sach.NAMXUATBAN || 'Không rõ' }}
      </p>
      <p class="sach-publisher">
        <strong>Nhà xuất bản:</strong>
        {{ getNXBName(sach.MANXB) || 'Không rõ' }}
      </p>
      <p class="sach-price">
        <strong>Giá:</strong>
        {{ formatPrice(sach.DONGIA) }}
      </p>
      <p class="sach-stock" :class="{ 'out-of-stock': sach.SOQUYEN === 0 }">
        <strong v-if="sach.SOQUYEN > 0">Số quyển:</strong>
        {{ sach.SOQUYEN > 0 ? `${sach.SOQUYEN} quyển` : 'Hết sách' }}
      </p>
    </div>

    <div class="sach-actions">
      <button class="btn btn-add" @click="Borrow">Mượn</button>
    </div>
  </div>

  <p v-else>Đang tải dữ liệu sách...</p>
</template>

<script>
  import axios from 'axios'
  import { borrowBooks } from '@/services/muonsachService'
  import { fetchNXB } from '@/services/nxbService'

  export default {
    name: 'ChiTietSach',
    data() {
      return {
        sach: null,
        nxbList: [],
        borrowList: [],
        ngayMuon: ''
      }
    },
    computed: {
      docGiaId() {
        return this.$store.state.user?._id || null
      }
    },
    methods: {
      async fetchSach() {
        const id = this.$route.params.id
        try {
          const res = await axios.get(`http://localhost:3000/api/sach/${id}`)
          this.sach = res.data
        } catch (err) {
          console.error('Lỗi khi tải sách:', err)
        }
      },
      async fetchNXBList() {
        try {
          this.nxbList = await fetchNXB()
          console.log('Danh sách nhà xuất bản:', this.nxbList)
        } catch (error) {
          console.error('Lỗi khi tải nhà xuất bản:', error)
        }
      },
      getNXBName(maNXB) {
        console.log('idNXB:', maNXB._id)
        const nxb = this.nxbList.find(
          n =>
            n.MANXB === maNXB._id ||
            n._id === maNXB._id ||
            String(n._id) === String(maNXB._id)
        )
        return nxb ? nxb.TENNXB : null
      },
      formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(price)
      },
      openBorrowForm() {
        this.ngayMuon = new Date().toISOString().split('T')[0]
      },
      async Borrow() {
        this.openBorrowForm()

        // console.log("docGiaId:", this.docGiaId);

        // console.log("Sách đang được mượn:", this.sach);
        // console.log("ID sách:", this.sach._id);

        if (!this.sach || !this.sach._id) {
          alert('Sách không hợp lệ!')
          return
        }

        try {
          this.borrowList.push({ book: this.sach._id, quantity: 1 })
          // console.log('borrowList:', JSON.stringify(this.borrowList, null, 2))
          await borrowBooks(this.docGiaId, this.borrowList, this.ngayMuon)
          alert('Đăng ký mượn thành công! Vui lòng chờ duyệt.')
          this.borrowList = []
        } catch (error) {
          alert(error.response?.data?.message || 'Lỗi không xác định!')
          console.error(error)
        }
      }
    },
    mounted() {
      this.fetchNXBList()
      this.fetchSach()
    }
  }
</script>
