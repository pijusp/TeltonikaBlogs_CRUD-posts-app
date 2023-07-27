import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        editPost: null,
        postLoaded: null,
        blogHTML: "Write your blog title here...",
        blogTitle: "",
        selectedAuthor: null,
        posts: [],
        authors: [],
    },
    modules: {},
    getters: {
        posts: (state) => {
            return state.posts;
        },
        getAuthorById: (state) => (authorId) => {
            return state.authors.find((author) => author.id === authorId);
        },
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blogHTML = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload;
        },
        updatePostAuthor(state, payload) {
            state.selectedAuthor = payload;
        },
        toggleEditPost(state, payload) {
            state.editPost = payload;
        },
        getPosts(state, posts) {
            state.posts = posts;
        },
        getAuthors(state, authors) {
            state.authors = authors;
        },
        deletePost(state, postId) {
            const index = state.posts.findIndex((post) => post.id === postId);
            if (index !== -1) {
                state.posts.splice(index, 1);
            }
        },
        setPostState(state, payload) {
            state.blogTitle = payload.title;
            state.blogHTML = payload.body;
        },
    },
    actions: {
        async loadPosts({ commit, state }) {
            try {
                const response = await axios.get("http://localhost:3000/posts");
                const posts = response.data;

                // Extract unique author IDs from the posts
                const authorIds = [
                    ...new Set(posts.map((post) => post.authorId)),
                ];

                // Fetch author details for each author ID
                const authorResponses = await Promise.all(
                    authorIds.map((id) =>
                        axios.get(`http://localhost:3000/authors/${id}`)
                    )
                );

                // Extract author data from the responses
                const authors = authorResponses.map(
                    (response) => response.data
                );

                // Update the Vuex state with the loaded posts and authors
                commit("getPosts", posts);
                commit("getAuthors", authors);
                state.postLoaded = true;
            } catch (error) {
                console.log(error);
            }
        },
        async deletePost({ commit }, postId) {
            try {
                const confirmed = window.confirm(
                    "Are you sure you want to delete this post?"
                );

                if (!confirmed) {
                    // If the user cancels the deletion, return without doing anything
                    return;
                }
                // Make the API call to delete the post based on the postId
                await axios.delete(`http://localhost:3000/posts/${postId}`);
                // Commit the DELETE_POST mutation to update the state
                commit("deletePost", postId);
            } catch (error) {
                console.log(error);
            }
        },
    },
});
