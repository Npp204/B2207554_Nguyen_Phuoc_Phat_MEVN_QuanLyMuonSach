<script setup>
  import HeaderComponent from './components/HeaderView.vue'
  import FooterComponent from './components/FooterView.vue'
</script>

<template>
  <div class="wrapper">
    <HeaderComponent />

    <main class="content">
      <div class="container mt-4">
        <router-view />
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<style>
  body {
    background: linear-gradient(135deg, #f9f5eb, #eae0d5);
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1;
  }
</style>
