<!-- <template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <h2 class="text-center text-primary">Đăng nhập Độc giả</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="sdt" class="form-label">Số điện thoại</label>
          <input type="text" id="sdt" v-model="sdt" class="form-control" placeholder="Nhập số điện thoại" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mật khẩu</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Nhập mật khẩu" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
      </form>
      <div class="text-start mt-2">
        <router-link to="/login-nhanvien" class="text-decoration-none text-muted">Là nhân viên?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sdt: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login/docgia', { 
          sdt: this.sdt, 
          password: this.password 
        });

        alert('Đăng nhập độc giả thành công');
        this.$router.push('/');
      } catch (error) {
        alert(error.response?.data?.message || 'Đăng nhập thất bại');
      }
    }
  }
};
</script> -->

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <h2 class="text-center text-primary">Đăng nhập Độc giả</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="sdt" class="form-label">Số điện thoại</label>
          <input type="text" id="sdt" v-model="sdt" class="form-control" placeholder="Nhập số điện thoại" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mật khẩu</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Nhập mật khẩu" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
      </form>
      <div class="text-start mt-2">
        <router-link to="/login-nhanvien" class="text-decoration-none text-muted">Là nhân viên?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  data() {
    return {
      sdt: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login/docgia', { 
          sdt: this.sdt, 
          password: this.password 
        });

        // Lưu vai trò vào Vuex store
        this.$store.dispatch('login', 'docgia'); // Giả sử vai trò của người dùng là 'docgia'

        alert('Đăng nhập độc giả thành công');
        this.$router.push('/'); // Chuyển hướng về trang chủ
      } catch (error) {
        alert(error.response?.data?.message || 'Đăng nhập thất bại');
      }
    }
  }
};
</script>

