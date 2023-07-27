<template>
    <div class="post-view" v-if="currentPost">
        <div class="container quillWrapper">
            <h2>{{ this.currentPost[0].title }}</h2>
            <h4>
                Posted on:
                {{
                    new Date(this.currentPost[0].created_at).toLocaleString(
                        "en-us",
                        {
                            dateStyle: "long",
                        }
                    )
                }}
            </h4>
            <h4>
                Written by: {{ getAuthorName(this.currentPost[0].authorId) }}
            </h4>
            <div
                class="post-content ql-editor"
                v-html="this.currentPost[0].body"
            ></div>
            <div class="buttons-wrapper">
                <button class="custom-button" @click="goBack">Go Back</button>
                <div class="buttons-group">
                    <button class="custom-button" @click="deletePost">
                        Delete
                    </button>
                    <button class="custom-button" @click="editPost">
                        Edit post
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewPost",
    data() {
        return {
            currentPost: null,
        };
    },
    async mounted() {
        this.currentPost = await this.$store.state.posts.filter((post) => {
            return post.id === this.$route.params.id;
        });
    },
    methods: {
        getAuthorName(authorId) {
            const author = this.$store.getters.getAuthorById(authorId);
            return author ? author.name : "Unknown Author";
        },
        goBack() {
            this.$router.push({ name: "Blogs" });
        },
        // [Vue warn]: Error in nextTick: "TypeError: Cannot read properties of undefined (reading '_wrapper')"
        // Missing button methods edit and delete
        deletePost() {
            this.$store.dispatch("deletePost", this.post.id);
        },
        editBlog() {
            this.$router.push({
                name: "EditBlog",
                params: { id: this.post.id },
            });
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
</style>
