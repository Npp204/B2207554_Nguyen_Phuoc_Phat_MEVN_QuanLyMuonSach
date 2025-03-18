<style scoped>
  .borrow-list {
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background: #f4f4f4;
  }

  th:last-child,
  td:last-child {
    width: 120px;
    text-align: center;
    padding: 5px;
  }

  .delete-btn {
    background: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
</style>

<template>
  <div class="nhanvien-list">
    <h2>Danh sách nhân viên</h2>
    <table>
      <thead>
        <tr>
          <th>Họ tên</th>
          <th>Số điện thoại</th>
          <th>Chức vụ</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhanvien in nhanViens" :key="nhanvien._id">
          <td>{{ nhanvien.HOTENNV }}</td>
          <td>{{ nhanvien.SODIENTHOAI }}</td>
          <td>
            {{ nhanvien.CHUCVU === 'QuanLyThuVien' ? 'Quản lý' : 'Nhân viên' }}
          </td>
          <td>
            <button
              class="delete-btn"
              @click="$emit('deleteNhanVien', nhanvien._id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      nhanViens: Array
    }
  }
</script>
