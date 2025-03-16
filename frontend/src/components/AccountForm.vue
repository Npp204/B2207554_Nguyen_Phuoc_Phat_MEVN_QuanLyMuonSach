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

/* Nút bấm */
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

/* Hiệu ứng nút khi click */
.btn:active {
    transform: scale(0.95);
}

/* Canh chỉnh nút */
.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
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

    <div class="button-group">
      <button type="submit" class="btn btn-success">Lưu</button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Hủy</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { updateUserInfo } from '@/services/accService'

const props = defineProps({
  user: Object,
  role: String,
  userId: String // Nhận ID từ cha
})
const emit = defineEmits(['cancel', 'update'])

// Copy dữ liệu để chỉnh sửa
const form = ref({
  diaChi: props.user?.DIACHI || '',
  hoLot: props.user?.HO_LOT || '',
  ten: props.user?.TEN || '',
  hoTen: props.user?.HOTENNV || '',
})

// Lưu thay đổi
const saveChanges = async () => {
  console.log("🔍 userId trong saveChanges:", props.userId);
  
  if (!props.userId) {
    alert("Lỗi: Không tìm thấy userId!");
    return;
  }

  try {
    let updateData;

    if (props.role === "docgia") {
      updateData = {
        HO_LOT: form.value.hoLot,
        TEN: form.value.ten,
        DIACHI: form.value.diaChi,
      };
    } else {
      updateData = {
        HOTENNV: form.value.hoTen,
        DIACHI: form.value.diaChi,
      };
    }

    console.log("Gửi yêu cầu cập nhật:", updateData);
    await updateUserInfo(props.role, props.userId, updateData);
    
    alert("Cập nhật thành công!");
    emit("update");
    emit("cancel");
  } catch (error) {
    alert("Có lỗi xảy ra!");
    console.error(error);
  }
};
</script>


