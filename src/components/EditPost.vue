<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Edit post</p>
            <button
                class="delete"
                aria-label="close"
                @click="closeModal"
            ></button>
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
        this.setPostDataFromCurrentPost(this.currentPost.postId);
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
        ...mapActions("editModal", ["updateBlog"]),
        async setPostDataFromCurrentPost(postId = this.postId) {
            try {
                const currentPost = await this.fetchCurrentPost(postId);
                this.blogTitle = currentPost.title;
                this.blogHTML = currentPost.body;
            } catch (error) {
                this.$toast.warning(("Error updating the post!", error), {
                    position: "top-right",
                    timeout: 4952,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
            }
        },
        handleUpdateBlog() {
            if (this.blogTitle.length === 0 || this.blogHTML.length === 0) {
                this.$toast.warning("Please fill out the post!", {
                    position: "top-right",
                    timeout: 2952,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
                return;
            }

            // Call the updateBlog action to update the post on the server.
            try {
                this.updateBlog({
                    postId: this.postId,
                    blogTitle: this.blogTitle,
                    blogHTML: this.blogHTML,
                });
                this.$toast.success("Blog post updated successfully!", {
                    position: "top-right",
                    timeout: 3000,
                });
            } catch (error) {
                console.error("Error updating blog post:", error);
                this.$toast.warning("Error updating the post!", {
                    position: "top-right",
                    timeout: 4952,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
            }

            // Close the modal after saving the changes.
            this.closeModal();
            this.$router.push({ name: "Blogs" });
        },

        closeModal() {
            // Dispatch an action to close the modal.
            this.$store.dispatch("editModal/closeEditModal");
        },
    },
};
</script>
<style>
.modal-card {
    margin-top: 100px;
}
</style>
