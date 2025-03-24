import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/store'

// Import các trang
import HomeView from '@/views/HomeView.vue';
import LoginNhanVien from '@/views/LoginNhanVien.vue';
import LoginDocGia from '@/views/LoginDocGia.vue';
import RegisterView from '@/views/RegisterView.vue';
import NotFound from '@/views/NotFound.vue';
import QuanLySachView from '@/views/QuanLySachView.vue';
import TaiKhoanView from '@/views/TaiKhoanView.vue';
import MuonSachView from '@/views/MuonSachView.vue';
import LichSuMuonView from '@/views/LichSuMuonView.vue';
import TheoDoiMuonView from '@/views/TheoDoiMuonView.vue';
import QuanLyTaiKhoanView from '@/views/QuanLyTaiKhoanView.vue';
import LienHeView from '@/views/LienHeView.vue'
import GioiThieuView from '@/views/GioiThieuView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/lien-he', component: LienHeView },
  { path: '/gioi-thieu', component: GioiThieuView },
  { path: '/login-nhanvien', component: LoginNhanVien },
  { path: '/login-docgia', component: LoginDocGia },
  { path: '/register', component: RegisterView },
  { path: '/:pathMatch(.*)*', component: NotFound },
  {
    path: '/quan-ly-sach',
    component: QuanLySachView,
    meta: { requiresAuth: true, role: 'quanly' }
  },
  { path: '/tai-khoan', component: TaiKhoanView, meta: { requiresAuth: true } },
  {
    path: '/muon-sach',
    component: MuonSachView,
    meta: { requiresAuth: true, role: 'docgia' }
  },
  {
    path: '/lich-su-muon',
    component: LichSuMuonView,
    meta: { requiresAuth: true, role: 'docgia' }
  },
  {
    path: '/theo-doi-muon',
    component: TheoDoiMuonView,
    meta: { requiresAuth: true, role: ['quanly', 'nhanvien'] }
  },
  {
    path: '/quan-ly-tai-khoan',
    component: QuanLyTaiKhoanView,
    meta: { requiresAuth: true, role: 'quanly' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = store.getters.getToken
  const role = store.getters.getUserRole

  if(to.meta.requiresAuth && !token) {
    alert('Bạn chưa đăng nhập!');
    next('/login-docgia');
  } else if (to.meta.role && ![].concat(to.meta.role).includes(role)) {
    alert('Bạn không đủ quyền truy cập vào trang này!')
    next(from.fullPath)
  } else {
    next()
  }
})

export default router;
