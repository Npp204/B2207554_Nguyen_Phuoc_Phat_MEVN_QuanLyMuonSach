import { createRouter, createWebHistory } from 'vue-router';

// Import các trang
import HomeView from '@/views/HomeView.vue';
import LoginNhanVien from '@/views/LoginNhanVien.vue';
import LoginDocGia from '@/views/LoginDocGia.vue';
import RegisterView from '@/views/RegisterView.vue';
import NotFound from '@/views/NotFound.vue';
import SachManager from '@/views/SachManager.vue';
import AccountView from '../views/AccountView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login-nhanvien', component: LoginNhanVien },
  { path: '/login-docgia', component: LoginDocGia },
  { path: '/register', component: RegisterView },
  { path: '/:pathMatch(.*)*', component: NotFound }, 
  { path: '/quan-ly-sach', component: SachManager },
  { path: '/tai-khoan', component: AccountView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
