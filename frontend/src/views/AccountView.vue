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
    <h1>Thông Tin Tài Khoản</h1>

    <div v-if="userInfo">
      <div v-if="!isEditing">
        <p><strong>Số điện thoại:</strong> {{ userInfo.sdt }}</p>
        <p><strong>Họ và Tên:</strong> {{ userInfo.hoTen }}</p>
        <p><strong>Địa chỉ:</strong> {{ userInfo.diaChi }}</p>
        <button @click="toggleEdit">Chỉnh sửa</button>
      </div>

      <AccountForm v-else :user="userInfo" :role="userRole" @cancel="toggleEdit" @update="fetchUser" />
    </div>

    <p v-else>Đang tải thông tin...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getUserInfo } from '@/services/accService'
import AccountForm from '@/components/AccountForm.vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = ref(null)
const isEditing = ref(false)

const userRole = computed(() => store.state.user.role);
const userID = computed(() => store.state.user.id);

console.log("userID từ Vuex:", store.state.user.id);

const fetchUser = async () => {
  if (!userID.value) {
    console.error('Không tìm tài khoản!')
    return
  }

  try {
    const userData = await getUserInfo(userID.value, userRole.value);

    console.log("Dữ liệu trả về từ API:", userData);

    userInfo.value = {
      sdt: userData.SODIENTHOAI || 'Không có số điện thoại',
      diaChi: userData.DIACHI || 'Chưa cập nhật',
      role: userRole,
      hoTen:
        userRole === 'docgia'
          ? `${userData.HO_LOT || ''} ${userData.TEN || ''}`
          : userData.HOTENNV || '',
      hoLot: userData.HO_LOT || '',
      ten: userData.TEN || '',
    }
  } catch (error) {
    console.error('Lỗi khi lấy thông tin tài khoản:', error)
  }
}

onMounted(fetchUser)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
</script>
