<template>
    <div>
        <div v-if="!currentPost" class="no-posts">No article found 😔.</div>
        <div class="post-view" v-if="currentPost">
            <div class="container quillWrapper">
                <h2>{{ currentPost.title }}</h2>
                <h4>
                    {{ editedAtDate || createdAtDate }}
                </h4>
                <h4>
                    Written by:
                    {{ getAuthorName(currentPost.authorId) }}
                </h4>
                <div
                    class="post-content ql-editor"
                    v-html="currentPost.body"
                ></div>
                <div class="buttons-wrapper">
                    <button class="custom-button" @click="goBack">
                        Go Back
                    </button>
                    <div class="buttons-group">
                        <button class="custom-button" @click="handleDeletePost">
                            Delete
                        </button>
                        <button class="custom-button" @click="openEditModal">
                            Edit post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toastMixin from "../mixins/toastMixin";
export default {
    name: "ViewPost",
    data() {
        return {
            currentPost: null,
            isDeleteConfirmed: false,
            isEditPostModalVisible: false,
            postIdToEdit: null,
        };
    },
    mixins: [toastMixin],
    created() {
        this.initCurrentPost();
    },
    methods: {
        ...mapActions("posts", ["loadPosts", "deletePost"]),
        ...mapActions("editModal", ["openEditModal"]),
        ...mapGetters("posts", ["getPosts", "getAuthorNameById", "getAuthors"]),
        async initCurrentPost() {
            try {
                // Load the posts from the Vuex store
                await this.loadPosts();

                // Get the current post ID from the route params
                const postId = this.$route.params.id;

                // Find the current post in the loaded posts
                this.currentPost = this.getPosts().find(
                    (post) => post.id === postId
                );

                if (!this.currentPost) {
                    this.showToast("Post not found", "warning", {
                        timeout: 5000,
                    });
                }
            } catch (error) {
                this.showToast(`Error loading modal: ${error}`, "warning", {
                    timeout: 5000,
                });
            }
        },
        goBack() {
            this.$router.push({ name: "Blogs" });
        },
        async handleDeletePost() {
            if (!this.isDeleteConfirmed) {
                const confirmed = window.confirm(
                    "Are you sure you want to delete this post?"
                );

                if (confirmed) {
                    try {
                        // Set the flag to true to avoid further confirmations
                        this.isDeleteConfirmed = true;
                        await this.deletePostFromAPI(this.currentPost.id); // Call the deletePost action directly
                        this.showToast(
                            "Blog post deleted successfully!",
                            "success"
                        );
                    } catch (error) {
                        // Handle any errors that occur during the request
                        this.showToast(
                            `Error deleting blog post: ${error}`,
                            "warning",
                            {
                                timeout: 5000,
                            }
                        );
                    }
                }
            }
        },
        async deletePostFromAPI(postId) {
            // Call the deletePost action from Vuex to delete the post
            await this.deletePost(postId);

            // Set the flag back to false to enable further confirmations
            this.isDeleteConfirmed = false;
            // Redirecting after delete
            this.$router.push({ name: "Blogs" });
        },
        openEditModal() {
            if (this.currentPost.id) {
                this.postIdToEdit = this.currentPost.id;
                this.isEditPostModalVisible = true;
                this.$store.dispatch(
                    "editModal/openEditModal",
                    this.postIdToEdit
                );
            } else {
                this.showToast("Invalid Post ID", "warning", {
                    timeout: 5000,
                });
            }
        },
    },
    computed: {
        createdAtDate() {
            return (
                "Created at: " +
                new Date(this.currentPost.created_at).toLocaleString("en-us", {
                    dateStyle: "long",
                })
            );
        },
        editedAtDate() {
            // Check if the post has been edited
            if (this.currentPost.created_at !== this.currentPost.updated_at) {
                return (
                    "Edited at: " +
                    new Date(this.currentPost.updated_at).toLocaleString(
                        "en-us",
                        {
                            dateStyle: "long",
                        }
                    )
                );
            }
            // Return null if the post has not been edited
            return null;
        },
        getAuthorName(authorId) {
            const authorName = this.getAuthorNameById(authorId);

            return authorName;
        },
    },
};
</script>

<style lang="scss" scoped>
.post-view {
    h4 {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
    }
    .buttons-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }

    .buttons-group {
        display: flex;
    }
    .buttons-group button {
        margin-right: 10px;
    }
}
.no-posts {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    font-size: 24px;
}
</style>
