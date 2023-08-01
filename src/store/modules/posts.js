// posts.js

import axios from "axios";
import Vue from "vue";
import router from "../../router";

export default {
    namespaced: true, // Namespaced module to avoid naming conflicts
    state: {
        editPost: null,
        postLoaded: null,
        blogHTML: "Write your blog title here...",
        blogTitle: "",
        selectedAuthor: null,
        posts: [],
        authors: [
            { id: 1, name: "Oliver" },
            { id: 2, name: "Evelyn" },
            { id: 3, name: "Leo" },
            { id: 4, name: "Luna" },
            { id: 5, name: "Max" },
        ],
    },
    getters: {
        getPosts: (state) => {
            return state.posts;
        },
        getAuthorById: (state) => (authorId) => {
            return state.authors.find((author) => author.id === authorId);
        },
        getBlogTitle: (state) => state.blogTitle,
        getBlogHTML: (state) => state.blogHTML,
        getBlogAuthor: (state) => state.selectedAuthor,
        getAuthors: (state) => state.authors,
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
        setPosts(state, posts) {
            state.posts = posts;
        },
        setAuthors(state, authors) {
            state.authors = authors;
        },
        DELETE_POST(state, postId) {
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
                commit("setPosts", posts);
                commit("setAuthors", authors);
                state.postLoaded = true;
                return posts;
            } catch (error) {
                console.log(error);
            }
        },
        async deletePost({ commit }, postId) {
            try {
                // Make the API call to delete the post based on the postId
                await axios.delete(`http://localhost:3000/posts/${postId}`);
                // Commit the DELETE_POST mutation to update the state
                commit("DELETE_POST", postId);
            } catch (error) {
                console.log(error);
            }
        },
        async createPost({ commit }, payload) {
            // Check if an author is selected

            // Get the current date and time
            const currentDate = new Date();

            // Format the date to yyyy-mm-dd format
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0");
            const day = String(currentDate.getDate()).padStart(2, "0");

            // Prepare the data to be sent to the server
            const newBlogPost = {
                title: payload.blogTitle,
                body: payload.blogHTML,
                authorId: payload.selectedAuthor,
                created_at: `${year}-${month}-${day}`,
                updated_at: `${year}-${month}-${day}`,
            };

            try {
                // Send the POST request to the server
                const response = await axios.post(
                    "http://localhost:3000/posts",
                    newBlogPost
                );

                // Display a success toast message
                Vue.$toast.success("Blog post uploaded successfully!", {
                    position: "top-right",
                    timeout: 3000,
                });

                // Redirect to the "Blogs" page after successful post creation
                router.push({ name: "Blogs" });

                // Clear the form fields after successful post creation
                commit("updateBlogTitle", "");
                commit("newBlogPost", "");
                commit("updatePostAuthor", null);
            } catch (error) {
                // Handle any errors that occur during the request
                // Display a warning toast message
                console.error(error);
                Vue.$toast.warning("Error uploading the post!", {
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
};
