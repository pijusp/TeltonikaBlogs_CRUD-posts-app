<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2>{{ this.currentPost[0].blogTitle }}</h2>
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
            <h6>
                Written by: {{ getAuthorName(this.currentPost[0].authorId) }}
            </h6>
            <div
                class="post-content ql-editor"
                v-html="this.currentPost[0].blogHTML"
            ></div>
            <button class="custom-button" @click="goBack">Go Back</button>
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
}
</style>
