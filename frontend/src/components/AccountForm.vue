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
        <label><input type="radio" value="Nam" v-model="form.gioiTinh" required /> Nam</label>
        <label><input type="radio" value="Nữ" v-model="form.gioiTinh" required /> Nữ</label>
      </div>
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
import { ref, watch } from 'vue'
import { updateUserInfo } from '@/services/accService'

const props = defineProps({
  user: Object,
  role: String,
  userId: String
})

const emit = defineEmits(['cancel', 'update'])

// Tạo form rỗng
const form = ref({
  diaChi: props.user?.diaChi || '',
  hoLot: props.user?.hoLot || '',
  ten: props.user?.ten || '',
  hoTen: props.user?.hoTen || '',
  gioiTinh: props.user?.gioiTinh || 'Nam',
  ngaySinh: props.user?.ngaySinh ? props.user.ngaySinh.split('T')[0] : '' 
});

watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value.diaChi = newUser.diaChi || '';
    form.value.hoLot = newUser.hoLot || '';
    form.value.ten = newUser.ten || '';
    form.value.hoTen = newUser.hoTen || '';
    form.value.ngaySinh = newUser.ngaySinh ? newUser.ngaySinh.split('T')[0] : '';
    form.value.gioiTinh = newUser.gioiTinh || 'Nam';
  }
}, { immediate: true })

const saveChanges = async () => {
  if (!props.userId) {
    alert("Lỗi: Không tìm thấy userId!");
    return;
  }

  try {
    let updateData;
    if (props.role === "docgia") {
      updateData = {
        HOLOT: form.value.hoLot,
        TEN: form.value.ten,
        DIACHI: form.value.diaChi,
        NGAYSINH: form.value.ngaySinh,
        PHAI: form.value.gioiTinh
      };
    } else {
      updateData = {
        HOTENNV: form.value.hoTen,
        DIACHI: form.value.diaChi
      };
    }

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

