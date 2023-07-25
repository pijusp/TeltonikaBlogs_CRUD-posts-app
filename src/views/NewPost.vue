<template>
    <div class="new-post">
        <div class="container">
            <div :class="{ invisible: !error }" class="errorMsg">
                <p><span>Error:</span>{{ this.errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input
                    type="text"
                    placeholder="Enter blog title"
                    v-model="blogTitle"
                />
                <select v-model="authorName" class="select-menu">
                    <option :value="null">Select an author</option>
                    <option
                        v-for="author in authors"
                        :key="author.id"
                        :value="author.id"
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
                    :to="{ name: 'PostPreview' }"
                    >Post Preview</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import Quill from "quill";
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
        uploadBlog() {
            // Check if an author is selected
            if (this.authorName === null) {
                this.errorMsg = "Please select an author for the blog.";
                this.error = true;
                return;
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
        authorName: {
            get() {
                return this.$store.state.authorName;
            },
            set(payload) {
                this.$store.commit("updateBlogAuthor", payload);
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

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #ad9baa;
        opacity: 1;
        transition: 0.5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
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
</style>
