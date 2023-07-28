<template>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div class="toggle-edit">
                <span>Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost" />
            </div>
            <div v-if="filteredPosts.length === 0" class="no-posts">
                No posts found 😔.
            </div>

            <BlogCard
                :post="post"
                v-for="(post, index) in paginatedPosts"
                :key="index"
            />
        </div>
        <div class="pagination-container">
            <pagination
                :totalPages="totalPages"
                :perPage="8"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
            />
        </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
import Pagination from "../components/Pagination.vue";
export default {
    name: "Blogs",
    components: { BlogCard, Pagination },
    props: ["searchQuery"],
    data() {
        return {
            currentPage: 1,
            perPage: 8,
        };
    },
    computed: {
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards;
        },
        posts() {
            return this.$store.getters.posts;
        },
        editPost: {
            get() {
                return this.$store.state.editPost;
            },
            set(payload) {
                this.$store.commit("toggleEditPost", payload);
            },
        },
        filteredPosts() {
            const searchQuery = this.searchQuery.trim().toLowerCase();
            if (searchQuery.length === 0) {
                // If searchQuery is empty, return all posts
                return this.posts;
            } else {
                // Otherwise, filter the posts based on the searchQuery
                const filteredPosts = this.posts.filter((post) =>
                    post.title.toLowerCase().includes(searchQuery)
                );
                return filteredPosts;
            }
        },
        totalPages() {
            return Math.ceil(this.filteredPosts.length / this.perPage);
        },

        // Slice the filteredPosts array to display the correct set of posts on the current page
        paginatedPosts() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.filteredPosts.slice(startIndex, endIndex);
        },
    },
    created() {
        this.$store.dispatch("loadPosts");
    },
    mounted() {
        this.$parent.$on("search", (searchQuery) => {
            this.searchQuery = searchQuery;
        });
    },
    methods: {
        onPageChange(page) {
            console.log(page);
            this.currentPage = page;
        },
        // Handle the onPageChange event from the pagination component
        onPageChange(page) {
            this.currentPage = page;
        },
    },
};
</script>

<style lang="scss" scoped>
.blog-cards {
    position: relative;

    .toggle-edit {
        display: flex;
        align-items: center;
        position: absolute;
        top: -70px;
        right: 0;

        span {
            margin-right: 16px;
        }

        input[type="checkbox"] {
            position: relative;
            border: none;
            -webkit-appearance: none;
            appearance: default;
            background: #fff;
            outline: none;
            width: 80px;
            height: 30px;
            border-radius: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        input[type="checkbox"]:before {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            top: 0;
            left: 0;
            background: #303030;
            transform: scale(1.1);
            transition: 750ms ease all;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        input:checked[type="checkbox"]:before {
            background: #fff;
            left: 52px;
        }
    }
    .no-posts {
        margin: auto;
        font-size: large;
    }

    .pagination-container {
        /* Center the pagination component horizontally */
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px; /* Add some margin at the top */
    }
}
</style>
