<style scoped>
  form {
    max-width: 450px;
    margin: 20px auto;
    padding: 25px;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 6px;
    color: #333;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
    transition: all 0.3s ease-in-out;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }

  .btn {
    padding: 10px 15px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    text-align: center;
    border: none;
  }

  .btn-success {
    background-color: #28a745;
    color: white;
  }

  .btn-success:hover {
    background-color: #218838;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
  }

  .btn:active {
    transform: scale(0.95);
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .radio-group {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 10px;
  }

  .radio-group label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
</style>

<template>
  <form @submit.prevent="saveChanges">
    <label>Địa chỉ:</label>
    <input v-model="form.diaChi" type="text" required />

    <div v-if="role === 'docgia'">
      <label>Họ Lót:</label>
      <input v-model="form.hoLot" type="text" required />

      <label>Tên:</label>
      <input v-model="form.ten" type="text" required />

      <label>Ngày Sinh:</label>
      <input v-model="form.ngaySinh" type="date" required />

      <label>Giới tính:</label>
      <div class="radio-group">
        <label>
          <input type="radio" value="Nam" v-model="form.gioiTinh" required />
          Nam
        </label>
        <label>
          <input type="radio" value="Nữ" v-model="form.gioiTinh" required />
          Nữ
        </label>
      </div>
    </div>

    <div v-else>
      <label>Họ và Tên:</label>
      <input v-model="form.hoTen" type="text" required />
    </div>

    <div class="button-group">
      <button type="submit" class="btn btn-success">Lưu</button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
        Hủy
      </button>
    </div>
  </form>
</template>

<script>
  import { updateUserInfo } from '@/services/accService'

  export default {
    props: {
      user: Object,
      role: String,
      userId: String
    },
    emits: ['cancel', 'update'],
    data() {
      return {
        form: {
          diaChi: this.user?.diaChi || '',
          hoLot: this.user?.hoLot || '',
          ten: this.user?.ten || '',
          hoTen: this.user?.hoTen || '',
          gioiTinh: this.user?.gioiTinh || 'Nam',
          ngaySinh: this.user?.ngaySinh ? this.user.ngaySinh.split('T')[0] : ''
        }
      }
    },
    watch: {
      user: {
        handler(newUser) {
          if (newUser) {
            this.form.diaChi = newUser.diaChi || ''
            this.form.hoLot = newUser.hoLot || ''
            this.form.ten = newUser.ten || ''
            this.form.hoTen = newUser.hoTen || ''
            this.form.ngaySinh = newUser.ngaySinh
              ? newUser.ngaySinh.split('T')[0]
              : ''
            this.form.gioiTinh = newUser.gioiTinh || 'Nam'
          }
        },
        immediate: true
      }
    },
    methods: {
      async saveChanges() {
        if (!this.userId) {
          alert('Lỗi: Không tìm thấy userId!')
          return
        }

        try {
          let updateData
          if (this.role === 'docgia') {
            updateData = {
              HOLOT: this.form.hoLot,
              TEN: this.form.ten,
              DIACHI: this.form.diaChi,
              NGAYSINH: this.form.ngaySinh,
              PHAI: this.form.gioiTinh
            }
          } else {
            updateData = {
              HOTENNV: this.form.hoTen,
              DIACHI: this.form.diaChi
            }
          }

          await updateUserInfo(this.role, this.userId, updateData)

          alert('Cập nhật thành công!')
          this.$emit('update')
          this.$emit('cancel')
        } catch (error) {
          alert('Có lỗi xảy ra!')
          console.error(error)
        }
      }
    }
  }
</script>
