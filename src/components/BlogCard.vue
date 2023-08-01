<template>
    <div class="blog-card">
        <div class="icons">
            <div @click="editBlog" class="icon">
                <img :src="Edit" class="edit" />
            </div>
            <div @click="handleDeletePost" class="icon">
                <img :src="Delete" class="delete" />
            </div>
        </div>
        <div class="info">
            <h4>{{ post.title }}</h4>
            <h6>Written by: {{ getAuthorName(post.authorId) }}</h6>
            <h6>
                {{ editedAtDate || createdAtDate }}
            </h6>
            <router-link
                class="link"
                :to="{ name: 'ViewPost', params: { id: post.id } }"
            >
                View The Post ➡️
            </router-link>
        </div>
    </div>
</template>

<script>
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/trash-regular.svg";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    name: "blogCard",
    props: ["post"],
    components: { Edit, Delete },
    data() {
        return {
            Edit,
            Delete,
            isDeleteConfirmed: false,
        };
    },
    methods: {
        ...mapActions("posts", ["loadPosts", "deletePost"]),
        async handleDeletePost() {
            if (!this.isDeleteConfirmed) {
                const confirmed = window.confirm(
                    "Are you sure you want to delete this post?"
                );

                if (confirmed) {
                    try {
                        // Set the flag to true to avoid further confirmations
                        this.isDeleteConfirmed = true;
                        console.log(this.post.id);
                        await this.deletePostFromAPI(this.post.id); // Call the deletePost action directly
                        this.$toast.success("Blog post deleted successfully!", {
                            position: "top-right",
                            timeout: 3000,
                        });
                    } catch (error) {
                        // Handle any errors that occur during the request
                        console.error("Error deleting blog post:", error);
                        this.$toast.warning("Error deleting the post!", {
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
                }
            }
        },
        async deletePostFromAPI(postId) {
            // Call the deletePost action from Vuex to delete the post
            await this.deletePost(postId);

            // Set the flag back to false to enable further confirmations
            this.isDeleteConfirmed = false;
        },
        editBlog() {
            this.$router.push({
                name: "EditPost",
                params: { id: this.post.id },
            });
        },
        getAuthorName(authorId) {
            const author = this.getAuthorById(authorId);
            return author ? author.name : "Unknown Author";
        },
    },
    computed: {
        ...mapState("posts", ["editPost"]),
        ...mapGetters("posts", ["getAuthorById"]),
        editPost() {
            return this.editPost;
        },
        createdAtDate() {
            return (
                "Created at: " +
                new Date(this.post.created_at).toLocaleString("en-us", {
                    dateStyle: "long",
                })
            );
        },
        editedAtDate() {
            // Check if the post has been edited
            if (this.post.created_at !== this.post.updated_at) {
                return (
                    "Edited at: " +
                    new Date(this.post.updated_at).toLocaleString("en-us", {
                        dateStyle: "long",
                    })
                );
            }
            // Return null if the post has not been edited
            return null;
        },
    },
};
</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #90e0ef;
    min-height: 250px;
    transition: 0.5s ease all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;
        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: 0.5s ease all;

            &:hover {
                background-color: #82ff9e;
                transform: scale(1.15);
            }

            &:nth-child(1) {
                margin-right: 8px;
            }

            .edit,
            .delete {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }

    img {
        z-index: 1;
        object-fit: cover;
        transform: scale(1.2);
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px;
        color: #000;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 300;
        }

        h6 {
            font-weight: 400;
            font-size: 12px;
            padding-bottom: 16px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            padding-top: 20px;
            font-size: 12px;
            padding-bottom: 4px;
            transition: 0.5s ease-in all;

            &:hover {
                color: rgba(48, 48, 48, 0.8);
            }

            .arrow {
                width: 10px;
            }
        }
    }
}
</style>
