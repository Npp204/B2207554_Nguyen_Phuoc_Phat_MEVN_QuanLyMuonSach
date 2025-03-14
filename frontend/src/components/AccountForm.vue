<style scoped>
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"] {
  background: #007bff;
  color: white;
}

button[type="submit"]:hover {
  background: #0056b3;
}

button[type="button"] {
  background: #ddd;
  color: #333;
}

button[type="button"]:hover {
  background: #bbb;
}

button:active {
  opacity: 0.8;
}

@media (max-width: 500px) {
  form {
    width: 90%;
    padding: 15px;
  }

  input {
    font-size: 14px;
    padding: 8px;
  }

  button {
    font-size: 14px;
    padding: 8px;
  }
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
    </div>

    <div v-else>
      <label>Họ và Tên:</label>
      <input v-model="form.hoTen" type="text" required />
    </div>

    <button type="submit">Lưu</button>
    <button type="button" @click="$emit('cancel')">Hủy</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { updateUserInfo } from '@/services/accService'

const props = defineProps({ user: Object, role: String })
const emit = defineEmits(['cancel', 'update'])

// Copy dữ liệu để chỉnh sửa
const form = ref({
  diaChi: props.user.diaChi || '',
  hoLot: props.user.hoLot || '',
  ten: props.user.ten || '',
  hoTen: props.user.hoTen || '',
})

// Lưu thay đổi
const saveChanges = async () => {
  try {
    let updateData

    if (props.role === 'docgia') {
      updateData = {
        HO_LOT: form.value.hoLot,
        TEN: form.value.ten,
        DIACHI: form.value.diaChi,
      }
    } else {
      updateData = {
        HOTENNV: form.value.hoTen,
        DIACHI: form.value.diaChi,
      }
    }

    await updateUserInfo(props.role, updateData)
    alert('Cập nhật thành công!')
    emit('update') // Yêu cầu cập nhật lại dữ liệu từ API
    emit('cancel') // Thoát chế độ chỉnh sửa
  } catch (error) {
    alert('Có lỗi xảy ra!')
  }
}
</script>
