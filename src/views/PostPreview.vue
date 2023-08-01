<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2>{{ blogTitle }}</h2>
            <div class="post-meta">
                <span class="post-author">By {{ selectedAuthorName }}</span>
            </div>
            <div class="post-content ql-editor" v-html="blogHTML"></div>
            <button class="custom-button" @click="goBack">Go Back</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "PostPreview",

    computed: {
        ...mapGetters("posts", ["getAuthorById"]),

        blogTitle() {
            return this.$route.params.blogTitle;
        },

        blogHTML() {
            return this.$route.params.blogHTML;
        },

        selectedAuthor() {
            return this.$route.params.selectedAuthor;
        },

        selectedAuthorName() {
            const author = this.getAuthorById(this.selectedAuthor);
            return author ? author.name : "Unknown Author";
        },
    },

    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="scss">
.post-view {
    min-height: 100%;

    .container {
        max-width: 1000px;
        padding: 60px 25px;
    }

    .ql-editor {
        padding: 0;
    }

    h2 {
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
    }

    img {
        width: 100%;
        margin-bottom: 32px;
    }
}
</style>
