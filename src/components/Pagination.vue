<template>
    <ul class="pagination">
        <li class="pagination-item">
            <button
                v-if="!isInFirstPage"
                type="button"
                @click="onClickFirstPage"
                :disabled="isInFirstPage"
            >
                First
            </button>
        </li>

        <li class="pagination-item">
            <button
                v-if="!isInFirstPage"
                type="button"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage"
            >
                Previous
            </button>
        </li>

        <!-- Visible Buttons Start -->

        <li v-for="page in pages" :key="page.name" class="pagination-item">
            <button
                type="button"
                @click="onClickPage(page.name)"
                :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }"
            >
                {{ page.name }}
            </button>
        </li>

        <!-- Visible Buttons End -->

        <li class="pagination-item">
            <button
                v-if="!isInLastPage"
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage"
            >
                Next
            </button>
        </li>

        <li class="pagination-item">
            <button
                v-if="!isInLastPage"
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage"
            >
                Last
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        perPage: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage <= 1) {
                return 1;
            }

            // When on the last page
            if (this.currentPage >= this.totalPages) {
                return Math.max(
                    1,
                    this.totalPages - this.maxVisibleButtons + 1
                );
            }

            // When in between
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <=
                Math.min(
                    this.startPage + this.maxVisibleButtons - 1,
                    this.totalPages
                );
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage,
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage <= 1;
        },
        isInLastPage() {
            return this.currentPage >= this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit("pagechanged", 1);
        },
        onClickPreviousPage() {
            this.$emit("pagechanged", this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit("pagechanged", page);
        },
        onClickNextPage() {
            this.$emit("pagechanged", this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit("pagechanged", this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        },
    },
};
</script>

<style scoped>
.pagination {
    list-style-type: none;
    /* Center the pagination component horizontally */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px; /* Add some margin at the top */
}

.pagination-item {
    display: inline-block;
}

.active {
    background-color: #243add;
    color: #ffffff;
}
</style>
