<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Edit post</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <div class="blog-info">
                <input type="text" v-model="blogTitle" />
            </div>
            <div class="editor">
                <vue-editor v-model="blogHTML" />
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" @click="handleUpdateBlog">
                Save changes
            </button>
            <button class="button" @click="closeModal">Cancel</button>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "EditPost",
    data() {
        return {
            currentPost: null,
        };
    },
    props: {
        postId: {
            type: Number,
            required: true,
        },
        fetchCurrentPost: {
            type: Function,
            required: true,
        },
    },
    async created() {
        this.currentPost = await this.fetchCurrentPost(this.postId);
        console.log("Created hook - currentPost:", this.currentPost);
    },
    watch: {
        postId: async function (postId) {
            console.log("Watch postId", postId);
            await this.setPostDataFromCurrentPost(postId);
            console.log("Watch postId - currentPost:", this.currentPost);
        },
    },
    computed: {
        ...mapGetters("posts", ["getBlogTitle", "getBlogHTML"]),
        postIdValue() {
            return this.postId; // Map the postId prop to a computed property
        },
        blogTitle: {
            get() {
                return this.getBlogTitle;
            },
            set(payload) {
                this.$store.commit("posts/updateBlogTitle", payload);
            },
        },
        blogHTML: {
            get() {
                return this.getBlogHTML;
            },
            set(payload) {
                this.$store.commit("posts/updateBlogHTML", payload);
            },
        },
    },
    methods: {
        ...mapActions("posts", [
            "updateBlogTitle",
            "updateBlogHTML",
            "loadPosts",
        ]),
        async setPostDataFromCurrentPost(postId = this.postId) {
            try {
                console.log("Setting post data from current post");
                const currentPost = await this.fetchCurrentPost(postId);
                this.blogTitle = currentPost.title;
                console.log("Setting blog title" - this.blogTitle);
                this.blogHTML = currentPost.body;
            } catch (error) {
                console.error("Error setting post data:", error);
            }
        },
        handleUpdateBlog() {
            // Save the changes to the store via the updateBlogTitle and updateBlogHTML actions.
            this.$store.dispatch("editModal/updateBlog", {
                blogTitle: this.blogTitle,
                blogHTML: this.blogHTML,
            });

            // You can also dispatch an action to update the post on the server if needed.
            // Call your API update method here.

            // Close the modal after saving the changes.
            this.closeModal();
        },
        closeModal() {
            // Dispatch an action to close the modal.
            this.$store.dispatch("editModal/closeEditModal");
        },
    },
};
</script>

<!-- <style lang="scss" scoped>
.new-post {
    position: relative;
    height: 100%;

    button {
        margin-top: 0;
    }

    .router-button {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-button {
        transition: 0.5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #35a7ff;
        text-decoration: none;

        &:hover {
            background-color: rgba(28, 61, 209, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
    }

    // error styling
    .invisible {
        opacity: 0 !important;
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 300px;
        }

        input {
            transition: 0.5s ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }
        .select-menu {
            margin-left: 20px;
            width: 120px;
            @media screen and (max-width: 767px) {
                margin-left: 0;
                margin-top: 10px;
            }
        }
        @media screen and (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start; /* Align items to the start of the container */
            margin-bottom: 16px; /* Optional: Reduce the margin for mobile view */
        }
    }

    .editor {
        height: 60vh;
        display: flex;
        flex-direction: column;

        .quillWrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ql-editor {
            padding: 20px 16px 30px;
        }
    }
    .custom-button {
        font-family: "Poppins", sans-serif;
    }

    .blog-actions {
        margin-top: 80px;

        button {
            margin-right: 16px;
        }
    }
}
</style> -->
