<style scoped>
  .navbar {
    background: #e7dfd9 !important;
    padding: 12px 20px;
    border-bottom: 3px solid #b89e25;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .navbar-brand {
    font-size: 20px;
    font-weight: 700;
    color: #5a4631 !important;
    transition: color 0.3s ease;
  }

  .navbar-brand:hover {
    color: #8e5b5b !important;
  }

  .navbar-nav .nav-link {
    font-size: 16px;
    font-weight: 500;
    color: #484f0d !important;
    margin: 0 10px;
    transition: color 0.3s ease, transform 0.2s ease;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .navbar-nav .nav-link:hover {
    background: #b89e25;
    color: #fff !important;
    transform: scale(1.05);
  }

  .navbar-nav .nav-link[to='/logout'] {
    background: #5a4631;
    color: #fff !important;
    border-radius: 5px;
    padding: 10px 15px;
  }

  .navbar-nav .nav-link[to='/logout']:hover {
    background: #3e3224;
    transform: scale(1.05);
  }

  .navbar-toggler {
    border: none;
    outline: none;
  }

  .navbar-toggler:focus {
    box-shadow: none;
  }

  @media (max-width: 992px) {
    .navbar-nav {
      text-align: center;
      padding-top: 10px;
    }

    .navbar-nav .nav-link {
      display: block;
      margin-bottom: 10px;
      padding: 10px;
    }
  }
</style>

<script>
  export default {
    computed: {
      userRole() {
        return this.$store.state.user.role
      }
    },
    methods: {
      handleLogout() {
        this.$store.dispatch('logout')
        this.$router.push('/login-docgia')
      }
    }
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">Quản lý mượn sách</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Trang chủ</router-link>
          </li>

          <template v-if="userRole === 'docgia'">
            <li class="nav-item">
              <router-link class="nav-link" to="/muon-sach">
                Mượn Sách
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lich-su-muon">
                Lịch Sử Mượn
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tai-khoan">
                Tài Khoản
              </router-link>
            </li>
          </template>

          <template v-else-if="userRole === 'quanly'">
            <li class="nav-item">
              <router-link class="nav-link" to="/quan-ly-sach">
                Quản Lý Sách
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/quan-ly-tai-khoan">
                Quản Lý Tài Khoản
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/theo-doi-muon">
                Theo Dõi Mượn
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tai-khoan">
                Tài Khoản
              </router-link>
            </li>
          </template>

          <template v-else-if="userRole === 'nhanvien'">
            <li class="nav-item">
              <router-link class="nav-link" to="/theo-doi-muon">
                Theo Dõi Mượn
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tai-khoan">
                Tài Khoản
              </router-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login-docgia">
                Đăng nhập
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Đăng ký</router-link>
            </li>
          </template>

          <li class="nav-item" v-if="userRole">
            <router-link class="nav-link" to="/logout" @click="handleLogout">
              Đăng Xuất
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
