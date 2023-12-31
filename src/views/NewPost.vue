<template>
    <div class="new-post">
        <div class="container">
            <div class="blog-info">
                <input
                    type="text"
                    placeholder="Enter blog title"
                    v-model="blogTitle"
                />
                <select v-model="selectedAuthor" class="select-menu">
                    <option :value="null">Select an author</option>
                    <option
                        v-for="author in getAuthors"
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
                <button @click="handleCreatePost" class="custom-button">
                    Publish Blog
                </button>
                <router-link
                    class="router-button custom-button"
                    :to="{
                        name: 'PostPreview',
                        params: {
                            blogTitle: blogTitle,
                            blogHTML: blogHTML,
                            selectedAuthor: selectedAuthor,
                        },
                    }"
                    >Post Preview</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import Quill from "quill";
import { mapMutations, mapActions, mapGetters } from "vuex";
import toastMixin from "../mixins/toastMixin";
window.Quill = Quill;
export default {
    name: "NewPost",
    data() {
        return {
            blogTitle: "",
            blogHTML: "",
            selectedAuthor: "null",
            isNavigatingToPreview: false,
        };
    },
    mixins: [toastMixin],
    methods: {
        // Map the mutations to update the Vuex store
        ...mapMutations("posts", [
            "updateBlogTitle",
            "updateBlogHTML",
            "updatePostAuthor",
        ]),
        // Map the actions to interact with the Vuex store and API
        ...mapActions("posts", ["loadPosts", "createPost"]),
        handleCreatePost() {
            // Check if an author is selected
            if (!this.selectedAuthor) {
                this.showToast("Please select an author!", "warning", {
                    timeout: 5000,
                });
                return;
            }

            if (this.blogTitle.length == 0 || this.blogHTML.length == 0) {
                this.showToast("Please fill out the post!", "warning", {
                    timeout: 5000,
                });
                return;
            }

            // Call the createPost action and pass the required data
            try {
                this.createPost({
                    blogTitle: this.blogTitle,
                    blogHTML: this.blogHTML,
                    selectedAuthor: this.selectedAuthor,
                });
                this.showToast("Blog post uploaded successfully!", "success");
            } catch (error) {
                this.showToast(
                    `Error uploading blog post: ${error}`,
                    "warning",
                    {
                        timeout: 5000,
                    }
                );
            }
        },
        fetchLocalData() {
            // Fetch data from the Vuex store and set the local data
            this.blogTitle = this.getBlogTitle;
            this.blogHTML = this.getBlogHTML;
            this.selectedAuthor = this.getBlogAuthor;
        },
    },
    computed: {
        ...mapGetters("posts", [
            "getBlogTitle",
            "getBlogHTML",
            "getBlogAuthor",
            "getAuthors",
        ]),
        setPost: {
            get() {
                // Getter: Fetch data from the store
                return {
                    blogTitle: this.getBlogTitle,
                    blogHTML: this.getBlogHTML,
                    selectedAuthor: this.getBlogAuthor,
                };
            },
            set(payload) {
                // Setter: Update data in the store
                this.commit("updateBlogTitle", payload);
                this.commit("updateBlogHTML", payload);
                this.commit("updatePostAuthor", payload);
            },
        },
    },
    watch: {
        $route(to, from) {
            if (to.name === "PostPreview") {
                this.isNavigatingToPreview = true;
            } else {
                this.isNavigatingToPreview = false;
            }
        },
    },
    beforeRouteLeave(to, from, next) {
        // Before leaving the NewPost route, store the form data in Vuex if not navigating to preview
        if (!this.isNavigatingToPreview) {
            this.updateBlogTitle(this.blogTitle);
            this.updateBlogHTML(this.blogHTML);
            this.updatePostAuthor(this.selectedAuthor);
        }

        next();
    },
    created() {
        // Fetch local data when the component is created
        this.fetchLocalData();
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
