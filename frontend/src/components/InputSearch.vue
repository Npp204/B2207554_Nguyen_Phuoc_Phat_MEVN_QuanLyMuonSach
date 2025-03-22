<style scoped>
.input-group {
  max-width: 400px; /* Giới hạn chiều rộng */
  margin: 0 auto; /* Căn giữa */
}

.form-control {
  border: 2px solid #b89e25;
  border-right: none;
  border-radius: 20px 0 0 20px; /* Bo tròn bên trái */
  padding: 10px;
  font-size: 16px;
}

.form-control:focus {
  box-shadow: none;
  border-color: #8a7312;
}

.btn-outline-secondary {
  border: 2px solid #b89e25;
  border-left: none;
  border-radius: 0 20px 20px 0; /* Bo tròn bên phải */
  background-color: #b89e25;
  color: white;
  font-weight: bold;
}

.btn-outline-secondary:hover {
  background-color: #8a7312;
  border-color: #8a7312;
}
</style>

<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Tìm kiếm sách" :value="modelValue"
      @input="updateModelValue" @keyup.enter="submit" />
    <button class="btn btn-outline-secondary" @click="submit">Tìm</button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue", "submit"]);

const updateModelValue = (e) => {
  emit("update:modelValue", e.target.value);
};

const submit = () => {
  emit("submit");
};
</script>