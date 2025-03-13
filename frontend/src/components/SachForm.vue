<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="MASACH">Mã Sách</label>
            <input type="text" class="form-control" v-model="bookLocal.MASACH" required />
        </div>
        <div class="form-group">
            <label for="TENSACH">Tên Sách</label>
            <input type="text" class="form-control" v-model="bookLocal.TENSACH" required />
        </div>
        <div class="form-group">
            <label for="MANXB">Nhà Xuất Bản</label>
            <select v-model="bookLocal.MANXB" class="form-control" required>
                <option value="" disabled>-- Chọn nhà xuất bản --</option>
                <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
                    {{ nxb.TENNXB }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="soLuong">Số lượng quyển</label>
            <input
                type="number"
                class="form-control"
                v-model.number="bookLocal.soLuong"
                min="1"
                required
            />
        </div>
        <div class="form-group">
            <label for="DONGIA">Đơn giá</label>
            <input type="number" v-model.number="bookLocal.DONGIA" class="form-control" id="DONGIA" required />
        </div>
        <button type="submit" class="btn btn-success">Lưu</button>
        <button type="button" class="btn btn-secondary ml-2" @click="$emit('cancel')">Hủy</button>
    </form>
</template>

<script>
export default {
    props: {
        book: { type: Object, default: () => ({ MASACH: "", TENSACH: "", MANXB: "", soLuong: 1, DONGIA: 0 }) },
        nxbList: { type: Array, required: true }, // Danh sách NXB bắt buộc
    },
    data() {
        return {
            bookLocal: { ...this.book },
        };
    },
    methods: {
        submitForm() {
            if (!this.bookLocal.MANXB) {
                alert("Vui lòng chọn Nhà Xuất Bản!");
                return;
            }
            this.$emit("submit", this.bookLocal);
        },
    },
};
</script>
