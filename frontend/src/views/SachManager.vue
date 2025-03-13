<template>
    <div>
        <h2>Quản Lý Sách</h2>

        <!-- Nút thêm sách -->
        <button @click="openBookForm(null)" class="btn btn-primary">Thêm Sách</button>

        <!-- Nút thêm nhà xuất bản -->
        <button @click="showNxbForm = true" class="btn btn-success ml-2">Thêm Nhà Xuất Bản</button>

        <!-- Form Thêm/Sửa Sách -->
        <SachForm
            v-if="showBookForm"
            :book="selectedBook"
            :nxbList="nxbs"
            @submit="saveBook"
            @cancel="closeBookForm"
        />

        <!-- Form Thêm Nhà Xuất Bản -->
        <NxbForm v-if="showNxbForm" @submit="saveNxb" @cancel="showNxbForm = false" />

        <!-- Danh sách sách -->
        <SachList :books="books" :nxbs="nxbs" @edit="openBookForm" @delete="deleteBook" />
    </div>
</template>

<script>
import SachForm from "@/components/SachForm.vue";
import NxbForm from "@/components/NxbForm.vue";
import SachList from "@/components/SachList.vue";
import { fetchBooks, createBook, updateBook, deleteBook } from "@/services/sachService";
import { fetchNXB, createNXB } from "@/services/nxbService";

export default {
    components: { SachForm, NxbForm, SachList },
    data() {
        return {
            books: [],
            nxbs: [],
            showBookForm: false,
            showNxbForm: false,
            selectedBook: null,
        };
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
            const nxb = this.nxbs.find(n => n.MANXB === manxb);
            return nxb ? nxb.TENNXB : "Không tìm thấy";
        },
        openBookForm(book) {
            this.selectedBook = book ? { ...book } : null;
            this.showBookForm = true;
        },
        closeBookForm() {
            this.selectedBook = null;
            this.showBookForm = false;
        },
        async saveBook(book) {
            try {
                book._id ? await updateBook(book) : await createBook(book);
                this.closeBookForm();
                this.loadBooks();
            } catch (error) {
                console.error("Lỗi khi lưu sách:", error);
            }
        },
        async saveNxb(nxb) {
            try {
                const newNXB = await createNXB(nxb);
                this.nxbs.push(newNXB);
                this.showNxbForm = false;
            } catch (error) {
                console.error("Lỗi khi thêm nhà xuất bản:", error);
            }
        },
        async deleteBook(id) {
            try {
                await deleteBook(id);
                this.loadBooks();
            } catch (error) {
                console.error("Lỗi khi xóa sách:", error);
            }
        }
    },
    created() {
        this.loadBooks();
        this.loadNXBs();
    }
};
</script>