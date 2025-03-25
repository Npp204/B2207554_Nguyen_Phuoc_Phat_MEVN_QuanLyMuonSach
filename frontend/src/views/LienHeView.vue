<style scoped>
.contact-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.contact-title {
  font-size: 2rem;
  font-weight: bold;
  color: #5a4631;
  margin-bottom: 20px;
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.contact-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.icon {
  font-size: 20px;
  margin-right: 10px;
}

.phone { color: #007bff; }
.email { color: #dc3545; }
.address { color: #28a745; }

.label {
  font-weight: bold;
  color: #444;
  margin-right: 8px;
}
.value {
  color: #666;
}

.map-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.map-frame {
  width: 100%;
  height: 300px;
  border: none;
}
</style>

<template>
  <div class="contact-container">
    <h1 class="contact-title">Liên Hệ</h1>

    <div class="contact-content">

      <div class="contact-info">
        <div class="contact-item">
          <i class="bi bi-telephone-fill icon phone"></i>
          <span class="label">Số điện thoại:</span>
          <span class="value">(+84) 862 974 822</span>
        </div>

        <div class="contact-item">
          <i class="bi bi-envelope-fill icon email"></i>
          <span class="label">Email:</span>
          <span class="value">phatb2207554@student.ctu.edu.vn</span>
        </div>

        <div class="contact-item">
          <i class="bi bi-geo-alt-fill icon address"></i>
          <span class="label">Địa chỉ:</span>
          <span class="value">Đại học Cần Thơ, Khu II, 3/2, Ninh Kiều, Cần Thơ</span>
        </div>
      </div>

      <div class="map-container">
        <iframe
          class="map-frame"
          frameborder="0"
          style="border:0"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.612316274087!2d105.7680404!3d10.0299337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1711200000000"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    googleMapUrl() {
      const address = encodeURIComponent("Đại học Cần Thơ, Khu II, 3/2, Ninh Kiều, Cần Thơ");
      return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${address}`;
    }
  }
};
</script>


