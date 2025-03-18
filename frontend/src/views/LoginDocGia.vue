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

        const token = response.data?.token ?? response.data?.user?.token;
        //console.log("Token:", token);
        const id = response.data?._id || response.data?.user?._id; 

        this.$store.dispatch("login", { _id: id, role: "docgia", token: token });

        alert('Đăng nhập độc giả thành công');
        this.$router.push('/'); 
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404 || error.response.status === 500) {
            alert('Số điện thoại chưa được đăng ký!');
          } else if (error.response.status === 401) {
            alert('Mật khẩu không đúng!');
          } else {
            alert('Lỗi hệ thống, vui lòng thử lại!');
          }
        } else {
          alert('Không thể kết nối đến máy chủ!');
        }
      }
    }
  }
};
</script>

