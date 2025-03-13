<style scoped>
form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.btn {
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-success {
    background-color: #28a745;
    border: none;
    color: white;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-secondary {
    background-color: #6c757d;
    border: none;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.ml-2 {
    margin-left: 10px;
}
</style>

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
