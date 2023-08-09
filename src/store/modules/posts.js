import axios from "axios";
import router from "../../router";
import { dateMixin } from "../../mixins/dateMixin";
export default {
    namespaced: true, // Namespaced module to avoid naming conflicts
    mixins: [dateMixin],
    state: {
        editPost: null,
        blogHTML: "Write your blog content here...",
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
            const author = state.authors.find(
                (author) => author.id === authorId
            );
            return author ? author.name : null;
        },
        getAuthorNameById: (state) => (authorId) => {
            return state.authors.find((author) => author.id === authorId)?.name;
        },
        getBlogTitle: (state) => state.blogTitle,
        getBlogHTML: (state) => state.blogHTML,
        getBlogAuthor: (state) => state.selectedAuthor,
        getAuthors: (state) => state.authors,
    },
    mutations: {
        updateBlogHTML(state, payload) {
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
    },
    actions: {
        async loadPosts({ commit }) {
            try {
                const response = await axios.get(
                    "http://localhost:3000/posts?_expand=author"
                );
                const posts = response.data;

                // Extract authors from the posts and remove the author object from each post
                const authors = posts.map((post) => post.author);
                // posts.forEach((post) => delete post.author);

                // Update the Vuex state with the loaded posts and authors
                commit("setPosts", posts);
                commit("setAuthors", authors);
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
            const currentDate = dateMixin.methods.getCurrentDateFormatted();
            // Prepare the data to be sent to the server
            const updateBlogHTML = {
                title: payload.blogTitle,
                body: payload.blogHTML,
                authorId: payload.selectedAuthor,
                created_at: currentDate,
                updated_at: currentDate,
            };

            try {
                // Send the POST request to the server
                const response = await axios.post(
                    "http://localhost:3000/posts",
                    updateBlogHTML
                );
                // Redirect to the "Blogs" page after successful post creation
                router.push({ name: "Blogs" });

                // Clear the form fields after successful post creation
                commit("updateBlogTitle", "");
                commit("updateBlogHTML", "");
                commit("updatePostAuthor", null);
            } catch (error) {
                // Handle any errors that occur during the request
                console.error(error);
            }
        },
    },
};
