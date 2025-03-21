<script setup>
import HeaderComponent from './components/HeaderView.vue'
import FooterComponent from './components/FooterView.vue'
</script>

<template>
  <div class="wrapper">
    <HeaderComponent /> <!-- Header -->

    <main class="content">
      <div class="container mt-4">
        <router-view /> <!-- Nội dung theo route -->
      </div>
    </main>

    <FooterComponent /> <!-- Footer luôn nằm dưới -->
  </div>
</template>

<style>
/* Định dạng wrapper để đảm bảo footer luôn ở cuối */
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Đảm bảo chiều cao tối thiểu bằng màn hình */
}

.content {
  flex: 1; /* Đẩy footer xuống cuối */
}
</style>
