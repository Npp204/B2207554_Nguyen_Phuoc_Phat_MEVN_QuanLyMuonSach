<style scoped>
  b {
    font-size: 16pt;
    font-weight: bold;
  }

  i {
    margin: 5px;
  }

  .footer {
    max-height: 400px;
    background: rgba(255, 255, 255, 0.3);
    padding: 5px 0;
    border-top: 3px solid rgba(204, 204, 204, 0.5);
    font-size: 11pt;
    overflow: hidden;
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
    font-size: 16pt;
    color: #222;
    font-weight: bold;
  }

  .footer-info p {
    font-size: 12pt;
    color: #555;
    margin-top: 5px;
  }

  .text-muted {
    font-size: 12pt;
    color: #6c757d;
  }

  .support-box {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 2px solid #ffc107;
    padding: 12px 20px;
    border-radius: 10px;
    background: #fffbe6;
    box-shadow: 2px 2px 10px rgba(255, 193, 7, 0.3);
    transition: all 0.3s ease;
  }

  .support-box:hover {
    background: #ffecb3;
    transform: scale(1.05);
  }

  .icon {
    color: #ffc107;
    font-size: 18px;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-link {
    padding: 5px 0;
    color: #555;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    font-size: 14pt;
    font-weight: 500;
    position: relative;
  }

  .footer-link:hover {
    color: #555;
    text-decoration: underline;
  }

  .footer-link::after {
    content: '';
    width: 0%;
    height: 2px;
    background: #555;
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  .footer-link:hover::after {
    width: 100%;
  }

  .footer-bottom {
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid #ddd;
    margin-top: 20px;
    font-size: 12pt;
    color: #6c757d;
  }

  .modal {
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-dialog {
    max-width: 700px;
    width: 100%;
    animation: fadeIn 0.3s ease-in-out;
  }

  .modal-content {
    border-radius: 12px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
    background: white;
  }

  .modal-header {
    background-color: #f8f9fa;
    border-bottom: 3px solid #ccc;
    border-radius: 12px 12px 0 0;
    padding: 18px;
  }

  .modal-title {
    font-size: 18pt;
    font-weight: bold;
    color: #343a40;
  }

  .btn-close {
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-close:hover {
    transform: rotate(90deg);
  }

  .modal-body {
    padding: 20px;
    font-size: 14pt;
    color: #444;
  }

  .modal-footer {
    border-top: 2px solid #ddd;
    padding: 15px;
    border-radius: 0 0 12px 12px;
  }

  .modal-backdrop {
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .footer {
      padding: 15px 0;
    }

    .footer .d-flex {
      text-align: center;
      flex-direction: column;
      gap: 15px;
    }

    .footer-info h2 {
      font-size: 17pt;
    }

    .support-box {
      justify-content: center;
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
    }

    .footer-links {
      align-items: center;
    }

    .footer-link {
      font-size: 14pt;
    }
  }

  @media (max-width: 480px) {
    .footer-info h2 {
      font-size: 15pt;
    }

    .footer-info p {
      font-size: 13pt;
    }

    .support-box {
      flex-direction: column;
      text-align: center;
      padding: 12px;
    }

    .footer-bottom {
      font-size: 12pt;
    }
  }

  /* ----- Hiệu ứng xuất hiện ----- */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal {
    z-index: 1050 !important;
  }

  .modal-backdrop {
    z-index: 1040 !important;
  }
</style>

<template>
  <footer class="container-fluid max-w-1280 mt-5 footer">
    <div class="d-flex flex-column flex-lg-row justify-content-between gap-4">
      <div class="footer-info ps-lg-5">
        <h2 class="fw-bold mb-0 text-muted">Hệ Thống Quản Lý Mượn Sách</h2>
        <p class="text-muted opacity-75">
          Hỗ trợ độc giả trong việc đăng ký và quản lý mượn sách trực tuyến một
          cách thuận tiện.
        </p>
      </div>
    </div>

    <div class="container max-w-1280 mx-auto px-0 px-lg-1">
      <div class="row">
        <div class="col-4 ps-lg-5 text-center text-lg-start">
          <div class="fw-bold fs-4">
            Chi Tiết
            <span class="text-primary-custom">Liên Hệ</span>
          </div>
          <div class="text-muted my-3">
            <i class="bi bi-geo-alt"></i>
            Đại học Cần Thơ
          </div>
          <div class="text-muted my-3">
            <i class="bi bi-envelope"></i>
            phatb2207554@student.ctu.edu.vn
          </div>
          <div>
            <div class="support-box">
              <i class="bi bi-telephone fs-4 icon"></i>
              <div>
                <span class="text-muted">Hỗ trợ độc giả 24/7</span>
                <div class="fw-semibold fs-5">0862 974 822</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4 ps-lg-5 text-center text-lg-start">
          <b>Thông Tin</b>
          <div class="footer-links">
            <router-link to="/gioi-thieu" class="footer-link">
              Giới thiệu
            </router-link>
            <a
              href="#"
              class="footer-link"
              @click.prevent="showDieuKhoan = true"
            >
              Điều khoản mượn sách
            </a>
            <a
              href="#"
              class="footer-link"
              @click.prevent="showHuongDan = true"
            >
              Hướng dẫn sử dụng
            </a>
            <router-link to="/lien-he" class="footer-link">Liên hệ</router-link>
          </div>
        </div>

        <div class="col-4 ps-lg-5 text-center text-lg-start">
          <b>Social</b>
          <div class="footer-links">
            <a
              href="https://www.facebook.com/nguyen.phat.602822"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              <i class="bi bi-facebook"></i>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/ngpat_207/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              <i class="bi bi-instagram"></i>
              Instagram
            </a>
            <a
              href="https://github.com/Npp204"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              <i class="bi bi-github"></i>
              GitHub
            </a>
            <a
              href="https://www.threads.net/@ngpat_207"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
            >
              <i class="bi bi-threads"></i>
              Threads
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom text-center">
      <div class="text-muted">Bản quyền © 2025.</div>
    </div>

    <div
      class="modal fade show"
      v-if="showDieuKhoan"
      style="display: block"
      aria-modal="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Điều khoản mượn sách</h5>
            <button
              type="button"
              class="btn-close"
              @click="showDieuKhoan = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              <i class="bi bi-bookmark"></i>
              Độc giả cần có tài khoản hợp lệ để mượn sách.
            </p>
            <p>
              <i class="bi bi-bookmark"></i>
              Thời gian mượn sách tối đa là 20 ngày.
            </p>
            <p>
              <i class="bi bi-bookmark"></i>
              Quá hạn sẽ bị phạt theo quy định.
            </p>
            <p>
              <i class="bi bi-bookmark"></i>
              Nếu mất hoặc làm hỏng sách, độc giả phải bồi thường.
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showDieuKhoan = false">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade show"
      v-if="showHuongDan"
      style="display: block"
      aria-modal="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Hướng dẫn sử dụng</h5>
            <button
              type="button"
              class="btn-close"
              @click="showHuongDan = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              <i class="bi bi-1-circle"></i>
              <b>Đăng nhập/Đăng ký:</b>
              Sử dụng số điện thoại để đăng nhập hoặc đăng ký tài khoản.
            </p>
            <p>
              <i class="bi bi-2-circle"></i>
              <b>Tìm kiếm sách:</b>
              Vào trang chủ để xem danh mục sách hoặc tìm sách với thanh tìm
              kiếm.
            </p>
            <p>
              <i class="bi bi-3-circle"></i>
              <b>Đăng ký mượn:</b>
              Chọn sách, thêm vào danh sách mượn, sau đó xác nhận.
            </p>
            <p>
              <i class="bi bi-4-circle"></i>
              <b>Kiểm tra lịch sử:</b>
              Xem trạng thái mượn sách trong mục
              <b>"Lịch sử mượn"</b>
              .
            </p>
            <p>
              <i class="bi bi-5-circle"></i>
              <b>Trả sách:</b>
              Mang sách đến thư viện hoặc sử dụng dịch vụ giao nhận để gửi lại.
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showHuongDan = false">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal-backdrop fade show"
      v-if="showDieuKhoan || showHuongDan"
    ></div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        showDieuKhoan: false,
        showHuongDan: false
      }
    }
  }
</script>
