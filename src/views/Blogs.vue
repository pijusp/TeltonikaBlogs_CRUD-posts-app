<template>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div class="toggle-edit">
                <span>Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost" />
            </div>
            <BlogCard
                :post="post"
                v-for="(post, index) in sampleBlogCards"
                :key="index"
            />
        </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
export default {
    name: "Blogs",
    components: { BlogCard },
    data() {
        return {
            sampleBlogCards: [
                {
                    title: "Title1",
                    authorName: "Author1",
                    created_at: "2023-05-23",
                },
                {
                    title: "Title2",
                    authorName: "Author2",
                    created_at: "2023-05-23",
                },
                {
                    title: "Title3",
                    authorName: "Author3",
                    created_at: "2023-05-23",
                },
            ],
        };
    },
    computed: {
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards();
        },
    },
};
</script>
