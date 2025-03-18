<style scoped>
  .account-view {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    color: #555;
    margin: 10px 0;
  }

  p strong {
    color: #222;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #0056b3;
  }

  button:active {
    background: #003d82;
  }

  button:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    .account-view {
      width: 90%;
      padding: 15px;
    }
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
    button {
      font-size: 14px;
      padding: 8px 12px;
    }
  }
</style>

<template>
  <div class="account-view">
    <h1 class="text-primary">Thông Tin Tài Khoản</h1>

    <div v-if="userInfo">
      <div v-if="!isEditing">
        <p>
          <strong>Số điện thoại:</strong>
          {{ userInfo.sdt }}
        </p>
        <p>
          <strong>Họ và Tên:</strong>
          {{ userInfo.hoTen }}
        </p>
        <p v-if="userRole === 'docgia'">
          <strong>Giới tính:</strong>
          {{ userInfo.gioiTinh }}
        </p>
        <p v-if="userRole === 'docgia'">
          <strong>Ngày sinh:</strong>
          {{ formatDate(userInfo.ngaySinh) }}
        </p>
        <p>
          <strong>Quyền hạn:</strong>
          {{ userInfo.chucVu }}
        </p>
        <p>
          <strong>Địa chỉ:</strong>
          {{ userInfo.diaChi }}
        </p>
        <button @click="toggleEdit">Chỉnh sửa</button>
      </div>

      <AccountForm
        v-if="isEditing"
        :user="userInfo"
        :role="userRole"
        :userId="userInfo._id"
        @update="fetchUser"
        @cancel="isEditing = false"
      />
    </div>

    <p v-else>Đang tải thông tin...</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getUserInfo } from '@/services/accService'
  import AccountForm from '@/components/AccountForm.vue'

  export default {
    components: { AccountForm },
    data() {
      return {
        userInfo: null,
        isEditing: false
      }
    },
    computed: {
      ...mapState({
        userRole() {
          return this.$store.state.user.role
        },
        userID() {
          return this.$store.state.user._id
        }
      })
    },
    methods: {
      async fetchUser() {
        if (!this.userID) {
          console.error('Không tìm tài khoản!')
          return
        }
        try {
          const userData = await getUserInfo(this.userID, this.userRole)
          this.userInfo = {
            _id: userData._id,
            sdt: userData.SODIENTHOAI || 'Không có số điện thoại',
            diaChi: userData.DIACHI || 'Chưa cập nhật',
            role: this.userRole,
            hoTen:
              this.userRole === 'docgia'
                ? `${userData.HOLOT || ''} ${userData.TEN || ''}`
                : userData.HOTENNV || '',
            hoLot: userData.HOLOT || '',
            ten: userData.TEN || '',
            gioiTinh: userData.PHAI || '',
            chucVu:
              this.userRole === 'docgia'
                ? 'Độc giả'
                : userData.CHUCVU === 'QuanLyThuVien'
                ? 'Quản lý'
                : 'Nhân viên',
            ngaySinh:
              this.userRole === 'docgia' && userData?.NGAYSINH
                ? userData.NGAYSINH.split('T')[0]
                : ''
          }
        } catch (error) {
          console.error('Lỗi khi lấy thông tin tài khoản:', error)
        }
      },
      toggleEdit() {
        this.isEditing = !this.isEditing
      },
      formatDate(dateString) {
        if (!dateString) return 'Chưa cập nhật'
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
      }
    },
    mounted() {
      this.fetchUser()
    }
  }
</script>
