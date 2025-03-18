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

<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Tìm kiếm sách" :value="modelValue"
      @input="updateModelValue" @keyup.enter="submit" />
    <button class="btn btn-outline-secondary" @click="submit">Tìm</button>
  </div>
</template>
