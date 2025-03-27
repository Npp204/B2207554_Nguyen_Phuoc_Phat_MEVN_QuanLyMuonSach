<style scoped>
  .account-view {
    max-width: 480px;
    min-width: 320px;
    margin: 50px auto;
    padding: 25px;
    background: rgba(255, 255, 255, 0.15); /* Lớp kính mờ */
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease-in-out;
  }

  h1 {
    font-size: 22pt;
    color: #5a4631;
    margin-bottom: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 13pt;
    color: #b89e25;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    text-align: left;
    margin: 0;
    font-weight: 500;
  }

  p:last-child {
    border-bottom: none;
  }

  p strong {
    color: #b85c5c;
    font-weight: 600;
  }

  button {
    background: rgba(255, 255, 255, 0.2);
    color: #b89e25;
    border: 3px solid rgba(133, 126, 126, 0.503);
    padding: 12px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(5px);
  }

  button:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: white;
    transform: scale(1.05);
  }

  button:active {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0.98);
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
    margin: 0 auto 15px;
    background-color: #5a4631;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    user-select: none;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  .avatar:hover {
    transform: scale(1.1);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 600px) {
    .account-view {
      width: 95%;
      padding: 20px;
    }

    h1 {
      font-size: 20pt;
    }

    p {
      font-size: 13pt;
      padding: 8px;
    }

    button {
      font-size: 14px;
      padding: 10px 15px;
    }
  }
</style>

<template>
  <div class="account-view">
    <h1>Thông Tin Tài Khoản</h1>

    <TaiKhoanForm
      v-if="isEditing"
      :user="userInfo"
      :role="userRole"
      :userId="userInfo._id"
      @update="fetchUser"
      @cancel="isEditing = false"
    />
    <div class="avatar">
      {{ initials }}
    </div>
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
      <button class="mt-3" @click="isEditing = true">Chỉnh sửa</button>
    </div>

    <p v-else>Đang tải thông tin...</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getUserInfo } from '@/services/accService'
  import TaiKhoanForm from '@/components/TaiKhoanForm.vue'

  export default {
    components: { TaiKhoanForm },
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
      }),
      initials() {
        if (!this.userInfo || !this.userInfo.hoTen) return '?'
        const words = this.userInfo.hoTen.trim().split(' ')
        const lastLetter =
          words.length > 1
            ? words[words.length - 1].charAt(0).toUpperCase()
            : ''
        return lastLetter
      }
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
