<style scoped>
h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

button {
    margin-bottom: 10px;
}

.btn-primary {
    background-color: #007bff;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-success {
    background-color: #28a745;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}

.btn-success:hover {
    background-color: #218838;
}

.ml-2 {
    margin-left: 10px;
}
</style>

<template>
    <div>

        <h2>Quản Lý Sách</h2>

        <InputSearch v-model="search" />

        <button @click="openBookForm(null)" class="btn btn-primary">Thêm Sách</button>

        <button @click="showNxbForm = true" class="btn btn-success ml-2">Thêm Nhà Xuất Bản</button>


        <SachForm
            v-if="showBookForm"
            :book="selectedBook"
            :nxbList="nxbs"
            @submit="saveBook"
            @cancel="closeBookForm"
        />

        <NxbForm v-if="showNxbForm" @submit="saveNxb" @cancel="showNxbForm = false" />

        <SachList :books="filteredBooks" :nxbs="nxbs" @edit="openBookForm" @delete="deleteBook" />

    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import SachForm from "@/components/SachForm.vue";
import NxbForm from "@/components/NxbForm.vue";
import SachList from "@/components/SachList.vue";
import { fetchBooks, createBook, updateBook, deleteBook } from "@/services/sachService";
import { fetchNXB, createNXB } from "@/services/nxbService";

export default {
    components: { SachForm, NxbForm, SachList, InputSearch },
    data() {
        return {
            search: "",
            books: [],
            nxbs: [],
            showBookForm: false,
            showNxbForm: false,
            selectedBook: null,
        };
    },
    computed: {
        filteredBooks() {
            return this.books.filter(book => {
                const tenSach = book.TENSACH ? book.TENSACH.toLowerCase() : ""; 
                const maSach = book.MASACH ? book.MASACH.toLowerCase() : "";
                const tacGia = book.NGUONGOC_TACGIA ? book.NGUONGOC_TACGIA.trim().toLowerCase() : "";
                const keyword = this.search.toLowerCase().trim();

                const manxbValue = book.MANXB?._id || book.MANXB?.MANXB || "";
                const nxb = this.nxbs.find(n => String(n._id) === String(manxbValue));
                const tenNXB = nxb ? nxb.TENNXB.toLowerCase() : "";

                return tenSach.includes(keyword) || 
                        maSach.includes(keyword) || 
                        tenNXB.includes(keyword) ||
                        tacGia.includes(keyword);
            });
        },
    },
    methods: {
        async loadBooks() {
            try {
                this.books = await fetchBooks();
            } catch (error) {
                console.error("Lỗi khi tải sách:", error);
            }
        },
        async loadNXBs() {
            try {
                this.nxbs = await fetchNXB();
            } catch (error) {
                console.error("Lỗi khi tải nhà xuất bản:", error);
            }
        },
        getNXBName(manxb) {
            if (!manxb) return "Chưa có NXB";
            const nxb = this.nxbs.find(n => n.MANXB === manxb || n._id === manxb || String(n._id) === String(manxb));
            return nxb ? nxb.TENNXB : "Không tìm thấy";
        },
        async openBookForm(book) {
            await this.loadNXBs();
            this.selectedBook = book ? { ...book } : null;
            this.showBookForm = true;
        },
        closeBookForm() {
            this.selectedBook = null;
            this.showBookForm = false;
        },
        async saveBook(book) {
            try {
                if (this.saving) return; 
                this.saving = true; 
                //console.log("Gọi saveBook:", book);
                if (book._id) {
                    await updateBook(book); 
                    alert("Cập nhật sách thành công!");
                } else {
                    await createBook(book); 
                    alert("Thêm sách mới thành công!");
                }
                this.closeBookForm();
                this.loadBooks();
            } catch (error) {
                console.error("Lỗi chi tiết:", error.response ? error.response.data : error.message);
                alert("Có lỗi xảy ra khi lưu sách: " + (error.response?.data?.message || error.message));
            }
        },
        async saveNxb(nxb) {
            try {
                const newNXB = await createNXB(nxb);
                this.nxbs.push(newNXB);
                alert("Thêm nhà xuất bản mới thành công!");
                this.showNxbForm = false;
            } catch (error) {
                console.error("Lỗi khi thêm nhà xuất bản:", error);
            }
        },
        async deleteBook(id) {
            try {
                await deleteBook(id);
                this.books = this.books.filter(book => book.MASACH !== id);
                alert("Xóa sách thành công!");
                this.loadBooks();
            } catch (error) {
                console.error("Lỗi khi xóa sách:", error);
            }
        },
    },
    created() {
        this.loadBooks();
        this.loadNXBs();
    },
};
</script>