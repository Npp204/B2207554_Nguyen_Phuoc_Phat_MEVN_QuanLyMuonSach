<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="TENNXB">Tên Nhà Xuất Bản</label>
            <input type="text" class="form-control" v-model="nxbLocal.TENNXB" required />
        </div>
        <div class="form-group">
            <label for="DIACHI">Địa Chỉ</label>
            <input type="text" class="form-control" v-model="nxbLocal.DIACHI" />
        </div>
        <button type="submit" class="btn btn-success">Lưu</button>
        <button type="button" class="btn btn-secondary ml-2" @click="$emit('cancel')">Hủy</button>
    </form>
</template>

<script>
export default {
    props: {
        nxb: { type: Object, default: () => ({ TENNXB: "", DIACHI: "" }) },
    },
    data() {
        return {
            nxbLocal: { ...this.nxb },
        };
    },
    methods: {
        submitForm() {
            if (!this.nxbLocal.TENNXB.trim()) {
                alert("Tên Nhà Xuất Bản không được để trống!");
                return;
            }
            this.$emit("submit", this.nxbLocal);
        },
    },
};
</script>
