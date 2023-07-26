<template>
    <div class="new-post">
        <div class="container">
            <!-- <div :class="{ invisible: !error }" class="errorMsg">
                <p><span>Error:</span>{{ this.errorMsg }}</p>
            </div> -->
            <div class="blog-info">
                <input
                    type="text"
                    placeholder="Enter blog title"
                    v-model="blogTitle"
                />
                <select v-model="selectedAuthor" class="select-menu">
                    <option :value="null">Select an author</option>
                    <option
                        v-for="author in authors"
                        :key="author.id"
                        :value="author.name"
                    >
                        {{ author.name }}
                    </option>
                </select>
            </div>
            <div class="editor">
                <vue-editor v-model="blogHTML" />
            </div>
            <div class="blog-actions">
                <button @click="uploadBlog" class="custom-button">
                    Publish Blog
                </button>
                <router-link
                    class="router-button custom-button"
                    :to="{
                        name: 'PostPreview',
                        params: { selectedAuthor: selectedAuthor },
                    }"
                    >Post Preview</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import Quill from "quill";
import axios from "axios";
import router from "../router";

window.Quill = Quill;
export default {
    name: "NewPost",
    data() {
        return {
            error: null,
            errorMsg: null,
            authors: [
                { id: 1, name: "Oliver" },
                { id: 2, name: "Evelyn" },
                { id: 3, name: "Leo" },
                { id: 4, name: "Luna" },
                { id: 5, name: "Max" },
            ],
        };
    },
    methods: {
        async uploadBlog() {
            // Check if an author is selected
            if (this.selectedAuthor === null) {
                this.$toast.warning("Please add an author!", {
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
            if (this.blogTitle.length == 0 || this.blogHTML.length == 0) {
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
            // Get the current date and time
            const currentDate = new Date();

            // Format the date to yyyy-mm-dd format
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0");
            const day = String(currentDate.getDate()).padStart(2, "0");

            // Find the author's ID based on their name
            const selectedAuthorObject = this.authors.find(
                (author) => author.name === this.selectedAuthor
            );

            // Prepare the data to be sent to the server
            const newBlogPost = {
                title: this.blogTitle,
                body: this.blogHTML,
                authorId: selectedAuthorObject ? selectedAuthorObject.id : null,
                created_at: `${year}-${month}-${day}`,
                updated_at: `${year}-${month}-${day}`,
            };

            try {
                // Send the POST request to the server
                const response = await axios.post(
                    "http://localhost:3000/posts",
                    newBlogPost
                );

                console.log("Blog post uploaded successfully:", response.data);
                this.$toast.success("Blog post uploaded successfully!", {
                    position: "top-right",
                    timeout: 3000,
                });
                router.push({ name: "ViewBlog" });

                this.blogTitle = "";
                this.selectedAuthor = null;
                this.blogHTML = "";
            } catch (error) {
                // Handle any errors that occur during the request
                console.error("Error uploading blog post:", error);
                this.$toast.warning("Error uploading the post!", {
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
    },
    computed: {
        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit("updateBlogTitle", payload);
            },
        },
        blogHTML: {
            get() {
                return this.$store.state.blogHTML;
            },
            set(payload) {
                this.$store.commit("newBlogPost", payload);
            },
        },
        selectedAuthor: {
            get() {
                return this.$store.state.selectedAuthor;
            },
            set(payload) {
                this.$store.commit("updatePostAuthor", payload);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
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

    /* .errorMsg {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #ae2519;
        opacity: 1;
        transition: 0.5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    } */

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
</style>
