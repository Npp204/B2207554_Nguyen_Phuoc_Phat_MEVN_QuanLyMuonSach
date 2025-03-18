<template>
  <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm w-100" style="max-width: 400px;">
      <h2 class="text-center mb-3 text-primary">Đăng ký</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <input type="text" class="form-control" v-model="sdt" placeholder="Số điện thoại" required />
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" v-model="password" placeholder="Mật khẩu" required />
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" v-model="confirmPassword" placeholder="Xác nhận mật khẩu" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
      </form>
      <div class="text-center mt-3">
        <p class="mb-0">Bạn đã có tài khoản? 
          <router-link to="/login-docgia" class="text-decoration-none">Đăng nhập</router-link>
        </p>
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
      confirmPassword: '',
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
      }

      try {
        await axios.post('http://localhost:3000/api/auth/register/docgia', { 
          sdt: this.sdt, 
          password: this.password, 
          confirmPassword: this.confirmPassword });
        alert('Đăng ký thành công');
        this.$router.push('/login-docgia');
      } catch (error) {
        alert(error.response?.data?.message || 'Đăng ký thất bại');
      }
    }
  }
};
</script>
