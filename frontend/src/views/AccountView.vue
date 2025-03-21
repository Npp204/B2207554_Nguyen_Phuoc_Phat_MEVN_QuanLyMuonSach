<style scoped>
  .account-view {
    max-width: 480px;
    min-width: 320px;
    margin: 50px auto;
    padding: 20px;
    background: #f9f4f2; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 2px solid #d8bb2b; 
    transition: all 0.3s ease-in-out;
  }

  h1 {
    font-size: 22pt;
    color: #b89e25; 
    margin-bottom: 15px;
    font-weight: 600;
  }

  p {
    font-size: 13pt;
    color: #333;
    padding: 10px;
    border-bottom: 1px solid #b89e25;
    text-align: left;
    margin: 0;
  }

  p:last-child {
    border-bottom: none;
  }

  p strong {
    color: #5a4631; 
  }

  button {
    background: #d8bb2b; 
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    margin-top: 15px;
  }

  button:hover {
    background: #c7aa30; 
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  }

  button:active {
    background: #9d871e; 
    transform: scale(0.98);
  }

  button:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .account-view.editing {
    border-color: #b89e25;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    .account-view {
      width: 90%;
      padding: 15px;
    }

    h1 {
      font-size: 20pt;
    }

    p {
      font-size: 14pt;
      padding: 8px;
    }

    button {
      font-size: 14px;
      padding: 8px 12px;
    }
  }
</style>

<template>
  <div class="account-view">
    <h1>Thông Tin Tài Khoản</h1>

    <AccountForm
      v-if="isEditing"
      :user="userInfo"
      :role="userRole"
      :userId="userInfo._id"
      @update="fetchUser"
      @cancel="isEditing = false"
    />

    <div v-if="userInfo">
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
      <button @click="isEditing = true">Chỉnh sửa</button>
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
