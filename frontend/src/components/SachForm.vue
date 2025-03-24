<style scoped>
  form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }

  input:focus,
  select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  .btn {
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
  }

  .btn-success {
    background-color: #28a745;
    border: none;
    color: white;
  }

  .btn-success:hover {
    background-color: #218838;
  }

  .btn-secondary {
    background-color: #6c757d;
    border: none;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
  }

  .ml-2 {
    margin-left: 10px;
  }
</style>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="MASACH">Mã Sách</label>
      <input
        type="text"
        class="form-control"
        v-model="bookLocal.MASACH"
        required
      />
    </div>
    <div class="form-group">
      <label for="TENSACH">Tên Sách</label>
      <input
        type="text"
        class="form-control"
        v-model="bookLocal.TENSACH"
        required
      />
    </div>
    <div class="form-group">
      <label for="MANXB">Nhà Xuất Bản</label>
      <select v-model="bookLocal.MANXB" class="form-control" required>
        <option value="" disabled>-- Chọn nhà xuất bản --</option>
        <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
          {{ nxb.TENNXB }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="soLuong">Số lượng quyển</label>
      <input
        type="number"
        class="form-control"
        v-model.number="bookLocal.SOQUYEN"
        min="1"
        required
      />
    </div>
    <div class="form-group">
      <label for="DONGIA">Đơn giá</label>
      <input
        type="number"
        v-model.number="bookLocal.DONGIA"
        class="form-control"
        id="DONGIA"
        required
      />
    </div>
    <div class="form-group">
      <label for="NAMXUATBAN">Năm xuất bản</label>
      <input
        type="number"
        v-model.number="bookLocal.NAMXUATBAN"
        class="form-control"
        id="NAMXUATBAN"
        required
      />
    </div>
    <div class="form-group">
      <label for="NGUONGOC_TACGIA">Tác giả</label>
      <input
        type="text"
        v-model="bookLocal.NGUONGOC_TACGIA"
        class="form-control"
        id="NGUONGOC_TACGIA"
        required
      />
    </div>
    <div class="form-group">
      <label for="HINHANH">Ảnh sách:</label>
      <input type="file" id="HINHANH" @change="onFileChange" />
    </div>
    <button class="btn btn-success">Lưu</button>
    <button
      type="button"
      class="btn btn-secondary ml-2"
      @click="$emit('cancel')"
    >
      Hủy
    </button>
  </form>
</template>

<script>
  export default {
    emits: ['submit', 'cancel'],
    props: {
      book: {
        type: Object,
        default: () => ({
          MASACH: '',
          TENSACH: '',
          MANXB: '',
          SOQUYEN: 1,
          DONGIA: 0,
          NAMXUATBAN: 2010,
          NGUONGOC_TACGIA: '',
          HINHANH: null
        })
      },
      nxbList: { type: Array, required: true }
    },
    data() {
      return {
        bookLocal: { ...this.book },
        formKey: 0
      }
    },
    watch: {
      book: {
        handler(newVal) {
          if (!newVal) return;
          //console.log('Book data received:', JSON.stringify(newVal, null, 2));
          this.bookLocal = { ...newVal }
          if (typeof newVal.MANXB === 'object' && newVal.MANXB !== null) {
            this.bookLocal.MANXB = newVal.MANXB._id;
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0]
        if (file) {
          this.bookLocal.HINHANH = file
        }
      },
      submitForm() {
        if (!this.bookLocal.MANXB) {
          alert('Vui lòng chọn Nhà Xuất Bản!')
          return
        }

        const bookData = { ...this.bookLocal }
        this.$emit('submit', bookData)

      }
    }
  }
</script>
