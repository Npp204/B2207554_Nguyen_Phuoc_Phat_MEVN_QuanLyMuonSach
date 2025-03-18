<style scoped>
.card {
  max-width: 500px;
  margin: auto;
  border-radius: 15px;
}

.sach-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
}
</style>

<template>
    <div class="container text-center mt-5">
        <InputSearch v-model="search" />
        <h2 class="text-primary">Danh sách sách</h2>
        <div class="sach-list" >
            <SachCard v-for="sach in filteredBooks" :key="sach.MASACH" :sach="sach" :nxbs="nxbs"/>
        </div>
    </div>
</template>

<script>
import SachCard from "@/components/SachCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import { fetchBooks } from "@/services/sachService";
import { fetchNXB } from "@/services/nxbService";

export default {
    components: {
        SachCard,
        InputSearch,
    },
    data() {
        return {
            sachList: [],
            search: "",
            nxbs: [],
        };
    },
    mounted() {
       this.loadBooks();
       this.loadNXBs();
    },
    computed: {
        filteredBooks() {
            return this.sachList.filter(book => {
                //console.log("Book MANXB:", book.MANXB);  

                const tenSach = book.TENSACH ? book.TENSACH.toLowerCase() : ""; 
                const maSach = book.MASACH ? book.MASACH.toLowerCase() : "";
                const tacGia = book.NGUONGOC_TACGIA ? book.NGUONGOC_TACGIA.toLowerCase() : "";
                const namNB = book.NAMXUATBAN ? String(book.NAMXUATBAN) : "";
                const keyword = this.search.toLowerCase().trim();

                // Nếu MANXB là một object, trích xuất _id hoặc MANXB
                const manxbValue = book.MANXB?._id || book.MANXB?.MANXB || "";

                //console.log("Extracted MANXB:", manxbValue);

                // Tìm NXB trong danh sách nxbs
                const nxb = this.nxbs.find(n => String(n._id) === String(manxbValue));
                const tenNXB = nxb ? nxb.TENNXB.toLowerCase() : "";

                //console.log("Tìm thấy NXB:", tenNXB || "Không tìm thấy");

                return tenSach.includes(keyword) 
                      || maSach.includes(keyword) 
                      || tenNXB.includes(keyword) 
                      || tacGia.includes(keyword)
                      || namNB.includes(keyword);
            });
        }
    },
    methods: {
        async loadBooks() {
            try {
                this.sachList = await fetchBooks();
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
    },
};
</script>
