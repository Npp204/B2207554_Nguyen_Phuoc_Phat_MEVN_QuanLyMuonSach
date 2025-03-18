<style scoped>
.borrow-list {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background: #f4f4f4;
}

th:last-child, td:last-child {
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
  <div class="docgia-list">
    <h2>Danh sách độc giả</h2>
    <table>
      <thead>
        <tr>
          <th>Họ tên</th>
          <th>Số điện thoại</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="docgia in docGias" :key="docgia._id">
          <td>{{ docgia.HOLOT }} {{ docgia.TEN }}</td>
          <td>{{ docgia.SODIENTHOAI }}</td>
          <td>
            <button class="delete-btn" @click="$emit('deleteDocGia', docgia._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    docGias: Array,
  },
};
</script>


