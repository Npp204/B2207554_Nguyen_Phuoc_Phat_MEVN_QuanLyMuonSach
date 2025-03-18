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

        <!-- Form Thêm Nhà Xuất Bản -->
        <NxbForm v-if="showNxbForm" @submit="saveNxb" @cancel="showNxbForm = false" />

        <!-- Danh sách sách -->
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
                //console.log("Book MANXB:", book.MANXB);  

                const tenSach = book.TENSACH ? book.TENSACH.toLowerCase() : ""; 
                const maSach = book.MASACH ? book.MASACH.toLowerCase() : "";
                const keyword = this.search.toLowerCase().trim();

                // Nếu MANXB là một object, trích xuất _id hoặc MANXB
                const manxbValue = book.MANXB?._id || book.MANXB?.MANXB || "";

                //console.log("Extracted MANXB:", manxbValue);

                // Tìm NXB trong danh sách nxbs
                const nxb = this.nxbs.find(n => String(n._id) === String(manxbValue));
                const tenNXB = nxb ? nxb.TENNXB.toLowerCase() : "";

                //console.log("Tìm thấy NXB:", tenNXB || "Không tìm thấy");

                return tenSach.includes(keyword) || maSach.includes(keyword) || tenNXB.includes(keyword);
            });
        }
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
                //console.log("Danh sách nhà xuất bản:", JSON.stringify(this.nxbs, null, 2));
            } catch (error) {
                console.error("Lỗi khi tải nhà xuất bản:", error);
            }
        },
        getNXBName(manxb) {
            //console.log("MANXB từ sách:", manxb);
            //console.log("Danh sách NXB:", this.nxbs);

            if (!manxb) return "Chưa có NXB";

            const nxb = this.nxbs.find(n => {
                return n.MANXB === manxb || n._id === manxb || String(n._id) === String(manxb);
            });

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
                console.error("Lỗi:", error);
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
        }
    },
    created() {
        this.loadBooks();
        this.loadNXBs();
    }
};
</script>