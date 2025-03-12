<script setup>
import HeaderComponent from './components/HeaderView.vue' // Import Header
</script>

<template>
  <HeaderComponent /> <!-- Header dùng chung -->

  <div class="container mt-4">
    <router-view /> <!-- Đây là nơi hiển thị nội dung theo route -->
  </div>
</template>

<style>
/* Nếu muốn thêm CSS chung cho toàn bộ app, có thể thêm vào đây */
</style>
