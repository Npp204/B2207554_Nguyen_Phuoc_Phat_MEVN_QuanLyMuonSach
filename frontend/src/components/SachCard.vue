<script setup>
defineProps({
  book: { type: Object, required: true },
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ book.TENSACH }}</h5>
      <p class="card-text">Mã sách: {{ book.MASACH }}</p>
      <button class="btn btn-primary" @click="emit('edit', book)">Sửa</button>
      <button class="btn btn-danger ml-2" @click="emit('delete', book._id)">Xóa</button>
    </div>
  </div>
</template>
