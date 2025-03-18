<style scoped>
.table {
    margin-top: 10px;
    text-align: center;
}
th, td {
    vertical-align: middle;
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
</style>

<template>
    <table class="table table-bordered">
        <thead class="thead-light">
            <tr>
                <th>Mã Sách</th>
                <th>Tên Sách</th>
                <th>Tác giả</th>
                <th>Nhà Xuất Bản</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Thao Tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="book in books" :key="book._id">
                <td>{{ book.MASACH || 'Không có mã' }}</td>
                <td>{{ book.TENSACH || 'Không có tên' }}</td>
                <td>{{ book.NGUONGOC_TACGIA || 'Không có tên' }}</td>
                <td>{{ getNXBName(book.MANXB) }}</td>
                <td>{{ book.SOQUYEN !== undefined ? book.SOQUYEN : 'Không có dữ liệu' }}</td>
                <td>{{ formatCurrency(book.DONGIA) }}</td>
                <td>
                    <div class="button-group">
                        <button class="btn btn-warning btn-sm mx-1" @click="$emit('edit', book)">Sửa</button>
                        <button class="btn btn-danger btn-sm" @click="$emit('delete', book._id)">Xóa</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        books: { type: Array, required: true },
        nxbs: { type: Array, required: true } 
    },
    methods: {
        getNXBName(book) {
            if (!book || !book.MANXB) return "Chưa có NXB";

            const manxb = typeof book.MANXB === "object" ? book.MANXB.MANXB : book.MANXB; 
            
            const nxb = this.nxbs.find(n => 
                n.MANXB === manxb || 
                n._id === manxb || 
                String(n._id) === String(manxb) 
            );
            return nxb ? nxb.TENNXB : "Không tìm thấy";
        },
        formatCurrency(value) {
            //console.log("Giá trị đơn giá:", value);
            if (value == null || isNaN(value)) return "Không có giá";
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
        }
    }
};
</script>


