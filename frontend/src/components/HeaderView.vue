<style scoped>
  body {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .navbar {
    display: flex;
    justify-content: center;
    padding: 8px 18px;
    border-radius: 0 0 12px 12px;
    transition: all 0.3s ease;
  }

  .navbar-brand {
    font-size: 22px;
    font-weight: bold;
    color: #5a4631 !important;
    transition: all 0.3s ease;
  }

  .navbar-brand:hover {
    color: #b85c5c !important;
    transform: scale(1.05);
  }

  .navbar-nav .nav-link {
    font-size: 16px;
    font-weight: 600;
    color: #3a3a0d !important;
    margin: 0 12px;
    transition: all 0.3s ease;
    padding: 12px 18px;
    border-radius: 8px;
  }

  .navbar-nav .nav-link:hover {
    background: #b89e25;
    color: white !important;
    transform: scale(1.08);
  }

  .navbar-nav .nav-link[to='/logout'] {
    background: #5a4631;
    color: #fff !important;
    border-radius: 8px;
    padding: 12px 18px;
  }

  .navbar-nav .nav-link[to='/logout']:hover {
    background: #3e3224;
    transform: scale(1.08);
  }

  .navbar-toggler {
    border: none;
    outline: none;
  }

  .navbar-toggler:focus {
    box-shadow: none;
  }

  @media (max-width: 992px) {
    .navbar {
      border-radius: 0;
    }
    .navbar-nav {
      text-align: center;
      padding-top: 10px;
    }

    .navbar-nav .nav-link {
      display: block;
      margin-bottom: 12px;
      padding: 12px;
    }
  }

  .header-container {
    text-align: center;
    padding: 10px 0;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
  }

  .welcome-text {
    font-size: 18px;
    font-weight: bold;
    color: #5a4631;
    margin-bottom: 8px;
  }

  .left-align {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
  }

  .left-align .navbar {
    justify-content: flex-start;
    width: 100%;
  }
</style>

<template>
  <div class="header-container">
    <p class="welcome-text">
      Chào mừng bạn đến với Hệ thống Quản lý Mượn Sách!
    </p>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="">
        <!-- <router-link class="navbar-brand" to="/">Quản lý mượn sách</router-link> -->
        <!-- <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button> -->
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
                  Quản Lý Mượn
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
                  Quản Lý Mượn
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
                <router-link class="nav-link" to="/register">
                  Đăng ký
                </router-link>
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
  </div>
</template>

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
