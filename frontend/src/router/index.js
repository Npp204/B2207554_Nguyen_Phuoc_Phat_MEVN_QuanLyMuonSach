import { createRouter, createWebHistory } from 'vue-router';

// Import các trang
import HomeView from '@/views/HomeView.vue';
import LoginNhanVien from '@/views/LoginNhanVien.vue';
import LoginDocGia from '@/views/LoginDocGia.vue';
import RegisterView from '@/views/RegisterView.vue';
import NotFound from '@/views/NotFound.vue';
import QuanLySachView from '@/views/QuanLySachView.vue';
import AccountView from '@/views/AccountView.vue';
import MuonSachView from '@/views/MuonSachView.vue';
import LichSuMuonView from '@/views/LichSuMuonView.vue';
import TheoDoiMuonView from '@/views/TheoDoiMuonView.vue';
import QuanLyTaiKhoanView from '../views/QuanLyTaiKhoanView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login-nhanvien', component: LoginNhanVien },
  { path: '/login-docgia', component: LoginDocGia },
  { path: '/register', component: RegisterView },
  { path: '/:pathMatch(.*)*', component: NotFound }, 
  { path: '/quan-ly-sach', component: QuanLySachView },
  { path: '/tai-khoan', component: AccountView },
  { path: '/muon-sach', component: MuonSachView },
  { path: '/lich-su-muon', component: LichSuMuonView },
  { path: '/theo-doi-muon', component: TheoDoiMuonView },
  { path: '/quan-ly-tai-khoan', component: QuanLyTaiKhoanView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
