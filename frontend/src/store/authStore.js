import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(sdt, password) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { sdt, password });
        this.user = response.data.user;
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Đăng nhập thất bại');
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    }
  }
});
