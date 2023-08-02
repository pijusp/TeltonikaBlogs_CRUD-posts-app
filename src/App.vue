<template>
    <div class="app-wrapper">
        <div class="app">
            <Navigation @search="handleSearch" />
            <router-view :searchQuery="searchQuery" />
            <div
                class="modal"
                v-if="isEditPostModalVisible"
                :class="{ 'modal-open': isEditPostModalVisible }"
            >
                <div class="modal-background"></div>
                <EditPost
                    :postId="postIdToEdit"
                    :fetchCurrentPost="fetchCurrentPost"
                />
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import EditPost from "./components/EditPost.vue";
import { mapState, mapActions } from "vuex";
export default {
    name: "app",
    components: { Navigation, Footer, EditPost },
    computed: {
        ...mapState("editModal", ["isEditPostModalVisible", "postIdToEdit"]),
        ...mapState(["posts"]),
    },
    data() {
        return {
            searchQuery: "",
        };
    },
    methods: {
        ...mapActions("posts", ["loadPosts"]),
        ...mapActions("editModal", ["openEditModal", "closeEditModal"]),
        handleSearch(searchQuery) {
            this.searchQuery = searchQuery;
        },
        async fetchCurrentPost(postId) {
            try {
                const currentPost = await this.loadPosts();
                const post = currentPost.find((post) => post.id === postId);
                console.log("Fetched post data:", post);
                return post;
            } catch (error) {
                console.error("Error loading posts:", error);
            }
        },
    },
    created() {
        this.loadPosts();
    },
    mounted() {},
    watch: {},
};
</script>

<style lang="scss">
body {
    font-family: "Poppins", sans-serif;
    background-color: #f1f1f1;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.modal-open {
    display: block;
}

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    max-width: 1440px;
    margin: 0 auto;
}

.link {
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
}

.link-light {
    color: #fff;
}
.arrow {
    margin-left: 8px;
    width: 12px;
    path {
        fill: #000;
    }
}
.arrow-light {
    path {
        fill: #fff;
    }
}

button,
.router-button {
    transition: 500ms ease all;
    cursor: pointer;
    margin-top: 24px;
    padding: 12px 24px;
    background-color: #35a7ff;
    color: #fff;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: rgba(28, 61, 209, 0.7);
    }
}

.button-ghost {
    color: #000;
    padding: 0;
    border-radius: 0;
    margin-top: 50px;
    font-size: 15px;
    font-weight: 500;
    background-color: transparent;
    @media (min-width: 700px) {
        margin-top: 0;
        margin-left: auto;
    }

    i {
        margin-left: 8px;
    }
}

.button-light {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
}

.button-inactive {
    pointer-events: none !important;
    cursor: none !important;
    background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
    text-align: center;
    font-size: 12px;
    color: red;
}

.blog-card-wrap {
    position: relative;
    padding: 80px 16px;
    background-color: #f1f1f1;
    @media (min-width: 500px) {
        padding: 100px 16px;
    }

    .blog-cards {
        display: grid;
        gap: 32px;
        grid-template-columns: 1fr;

        @media (min-width: 500px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: 1200px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }
}
</style>
