import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
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
        editPost: null,
        blogHTML: "Write you blog title here...",
        blogTitle: "",
        authorName: null,
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blogHTML = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload;
        },
        updateBlogAuthor(state, payload) {
            state.authorName = payload;
        },
        toggleEditPost(state, payload) {
            state.editPost = payload;
        },
    },
    actions: {},
    modules: {},
});
