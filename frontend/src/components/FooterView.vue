<style scoped>
  .footer {
    background-color: #f8f9fa;
    padding: 20px 0;
    border-top: 2px solid #ddd;
    font-size: 13pt;
  }

  .footer .d-flex {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .footer-info {
    flex: 1;
    padding: 10px;
    max-width: 500px;
    margin: 0 auto;
  }

  .footer-info h2 {
    font-size: 19pt;
    color: #343a40;
    font-weight: bold;
  }

  .footer-info p {
    font-size: 13pt;
    color: #6c757d;
    margin-top: 5px;
  }

  .text-muted {
    font-size: 13pt;
    color: #6c757d;
  }

  .support-box {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ffc107;
    padding: 10px 20px;
    border-radius: 8px;
    width: fit-content;
    background: #fffaf0;
  }

  .icon {
    color: #ffc107;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .footer-link {
    padding: 5px 0;
    color: #6c757d;
    cursor: pointer;
    transition: color 0.3s ease;
    text-decoration: none;
    font-size: 13pt;
  }

  .footer-link:hover {
    color: #007bff;
  }

  .footer-bottom {
    text-align: center;
    padding: 15px 0;
    border-top: 1px solid #ddd;
    margin-top: 20px;
    font-size: 12pt;
    color: #6c757d;
  }

  @media (max-width: 768px) {
    .footer {
      padding: 15px 0;
    }

    .footer .d-flex {
      text-align: center;
      flex-direction: column;
      gap: 10px;
    }

    .footer-info h2 {
      font-size: 18pt;
    }

    .support-box {
      justify-content: center;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }

    .footer-links {
      align-items: center;
    }

    .footer-link {
      font-size: 13pt;
    }
  }

  @media (max-width: 480px) {
    .footer-info h2 {
      font-size: 16pt;
    }

    .footer-info p {
      font-size: 13pt;
    }

    .support-box {
      flex-direction: column;
      text-align: center;
      padding: 10px;
    }

    .footer-bottom {
      font-size: 12pt;
    }
  }
</style>

<template>
  <footer class="container-fluid max-w-1280 mt-5 footer">
    <div class="d-flex flex-column flex-lg-row justify-content-between gap-4">
      <div class="footer-info ps-lg-5">
        <h2 class="fw-bold mb-0 text-muted">Hệ Thống Quản Lý Mượn Sách</h2>
        <p class="text-muted opacity-75">
          Hỗ trợ độc giả trong việc đăng ký và quản lý mượn sách trực tuyến một cách thuận tiện.
        </p>
      </div>
    </div>

    <div class="container max-w-1280 mx-auto px-0 px-lg-1">
      <div class="row">
        <div class="col-4 ps-lg-5 text-center text-lg-start">
          <div class="fw-bold fs-4">Chi Tiết <span class="text-primary-custom">Liên Hệ</span></div>
          <div class="text-muted my-3">
            <i class="bi bi-geo-alt"></i> Đại học Cần Thơ
          </div>
          <div class="text-muted my-3">
            <i class="bi bi-envelope"></i> phatb2207554@student.ctu.edu.vn
          </div>
          <div>
            <div class="support-box">
              <i class="bi bi-telephone fs-4 icon"></i>
              <div>
                <span class="text-muted"> Hỗ trợ độc giả 24/7 </span>
                <div class="fw-semibold fs-5">0862 974 822</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4 ps-lg-5 text-center text-lg-start">
          <b>Thông Tin</b>
          <div class="footer-links">
            <router-link to="/" class="footer-link">Trang chủ</router-link> 
            <router-link to="/" class="footer-link" @click.prevent="showDieuKhoan">Điều khoản mượn sách</router-link> 
            <router-link to="/" class="footer-link" @click.prevent="showHuongDan">Hướng dẫn sử dụng</router-link> 
          </div>  
        </div>

        <div class="col-4 ps-lg-5 text-center text-lg-start">
          <b>Tài Khoản</b>
          <div class="footer-links">
            <router-link to="/login-docgia" class="footer-link">Đăng nhập</router-link> 
            <router-link to="/lich-su-muon" class="footer-link">Lịch sử mượn</router-link> 
            <router-link to="/muon-sach" class="footer-link">Đăng ký mượn</router-link> 
          </div>  
        </div>
      </div>
    </div>

    <div class="footer-bottom text-center">
      <div class="text-muted">Bản quyền © 2025 - Hệ Thống Quản Lý Mượn Sách.</div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    showHuongDan() {
      alert("Bạn có thể trả lại sách bằng cách sử dụng bất kỳ dịch vụ vận chuyển, giao nhận hàng hóa mà bạn muốn để trả sách.");
    },
    showDieuKhoan() {
      alert("Thời gian mượn tối đa 1 quyển sách là 20 ngày.")
    }
  }
};
</script>


