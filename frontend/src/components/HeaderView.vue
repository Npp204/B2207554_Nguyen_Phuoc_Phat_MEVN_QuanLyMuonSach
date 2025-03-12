<!-- <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userRole = ref(localStorage.getItem('userRole')); // Lấy vai trò từ localStorage

const handleLogout = () => {
  localStorage.removeItem('userRole'); // Xóa vai trò
  userRole.value = null;
  router.push('/login-docgia'); // Chuyển về trang đăng nhập độc giả
  window.location.reload(); // Reload lại để cập nhật header
};

onMounted(() => {
  userRole.value = localStorage.getItem('userRole'); // Cập nhật khi load lại trang
});
</script> -->

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Khởi tạo Vuex store và Router
const store = useStore();
const router = useRouter();

// Lấy userRole từ Vuex store
const userRole = computed(() => store.state.userRole);

// Đăng xuất và xóa thông tin role trong Vuex và localStorage
const handleLogout = () => {
  store.dispatch('logout'); // Gọi action logout để xóa userRole trong Vuex
  router.push('/login-docgia'); // Chuyển hướng về trang đăng nhập độc giả
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">Quản lý mượn sách</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Trang chủ</router-link>
          </li>

          <!-- Nếu đăng nhập với vai trò Độc giả -->
          <template v-if="userRole === 'docgia'">
            <li class="nav-item">
              <router-link class="nav-link" to="/muon-sach">Mượn Sách</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lich-su-muon">Lịch Sử Mượn</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tai-khoan">Tài Khoản</router-link>
            </li>
          </template>

          <!-- Nếu đăng nhập với vai trò Nhân viên -->
          <template v-else-if="userRole === 'nhanvien'">
            <li class="nav-item">
              <router-link class="nav-link" to="/quan-ly-sach">Quản Lý Sách</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/quan-ly-docgia">Quản Lý Độc Giả</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/theo-doi-muon">Theo Dõi Mượn</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tai-khoan">Tài Khoản</router-link>
            </li>
          </template>

          <!-- Nếu chưa đăng nhập -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login-docgia">Đăng nhập</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Đăng ký</router-link>
            </li>
          </template>

          <!-- Logout -->
          <li class="nav-item" v-if="userRole">
            <router-link class="nav-link" to="/logout" @click="handleLogout">Đăng Xuất</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
