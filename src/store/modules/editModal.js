import axios from "axios";
import { dateMixin } from "../../mixins/dateMixin";

export default {
    namespaced: true,
    mixins: [dateMixin],
    state: {
        isEditPostModalVisible: false,
        postIdToEdit: null,
    },
    mutations: {
        showEditModal(state, postId) {
            state.isEditPostModalVisible = true;
            state.postIdToEdit = postId;
        },
        hideEditModal(state) {
            state.isEditPostModalVisible = false;
            state.postIdToEdit = null;
        },
    },
    actions: {
        openEditModal({ commit }, postId) {
            commit("showEditModal", postId);
        },
        closeEditModal({ commit }) {
            commit("hideEditModal");
        },

        async updateBlog({ commit }, { postId, blogTitle, blogHTML }) {
            // Get the current date and time
            const currentDate = dateMixin.methods.getCurrentDateFormatted();

            // Prepare the data to be sent to the server
            const updatedBlogPost = {
                title: blogTitle,
                body: blogHTML,
                updated_at: currentDate,
            };

            try {
                const response = await axios.patch(
                    `http://localhost:3000/posts/${postId}`, // Use the specific post ID in the URL
                    updatedBlogPost
                );
            } catch (error) {
                // Handle any errors that occur during the request
                console.error(error);
            }
        },
    },
};
