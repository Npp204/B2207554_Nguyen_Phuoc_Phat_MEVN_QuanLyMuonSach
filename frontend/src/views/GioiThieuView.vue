<style scoped>
  h1 {
    color: #5a4631;
  }

  .card {
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  .card-title {
    font-size: 1.5rem;
    color: #5a4631;
  }
  .list-group-item {
    border: none;
    font-size: 1.1rem;
  }
  .list-group-item i {
    margin-right: 8px;
    color: #5a4631;
  }
  .btn-primary {
    background: #b89e25;
    font-size: 1.2rem;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
  }
</style>

<template>
  <div class="container my-2">
    <h1 class="text-center mb-4">
      Giới thiệu hệ thống Quản lý mượn sách
    </h1>

    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Mục tiêu</h2>
        <p class="card-text">
          Hệ thống
          <strong>Quản lý mượn sách</strong>
          giúp quản lý việc mượn sách dễ dàng và nhanh chóng hơn. Độc giả có thể
          tìm kiếm, đăng ký mượn sách, xem lịch sử mượn, trong khi quản trị viên
          có thể kiểm duyệt yêu cầu mượn.
        </p>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-body">
        <h2 class="card-title">Chức năng chính</h2>
        <ul class="list-group">
          <li class="list-group-item">
            <i class="bi bi-search"></i>
            Tìm kiếm sách theo tiêu đề, tác giả, nhà xuất bản.
          </li>
          <li class="list-group-item">
            <i class="bi bi-cart-plus"></i>
            Thêm sách vào danh sách đăng ký mượn.
          </li>
          <li class="list-group-item">
            <i class="bi bi-clock-history"></i>
            Xem lịch sử mượn sách.
          </li>
          <li class="list-group-item">
            <i class="bi bi-check2-circle"></i>
            Quản trị viên xét duyệt yêu cầu mượn/trả sách.
          </li>
          <li class="list-group-item">
            <i class="bi bi-bar-chart"></i>
            Thống kê số lượng sách còn trong thư viện.
          </li>
        </ul>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-body">
        <h2 class="card-title">Công nghệ sử dụng</h2>
        <p class="card-text">
          Hệ thống được phát triển bằng
          <strong>MEVN Stack</strong>
          (MongoDB, Express.js, Vue.js, Node.js), giúp đảm bảo hiệu suất cao và
          giao diện thân thiện với người dùng.
        </p>
      </div>
    </div>

    <div class="text-center mt-4">
      <router-link to="/" class="btn btn-primary">
        <i class="bi bi-house-door"></i>
        Về trang chủ
      </router-link>
    </div>
  </div>
</template>
