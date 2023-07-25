<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2>{{ this.blogTitle }}</h2>
            <div class="post-meta">
                <span class="post-author"
                    >By {{ this.$route.params.selectedAuthor }}</span
                >
            </div>
            <div class="post-content ql-editor" v-html="blogHTML"></div>
            <button class="custom-button" @click="goBack">Go Back</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostPreview",
    computed: {
        blogTitle() {
            return this.$store.state.blogTitle;
        },
        blogHTML() {
            return this.$store.state.blogHTML;
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
