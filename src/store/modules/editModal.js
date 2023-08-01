export default {
    namespaced: true,
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
        async updateBlog() {
            if (this.blogTitle.length == 0 || this.blogHTML.length == 0) {
                this.$toast.warning("Please fill out the post!", {
                    position: "top-right",
                    timeout: 2952,
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
                return;
            }
            // Get the current date and time
            const currentDate = new Date();

            // Format the date to yyyy-mm-dd format
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0");
            const day = String(currentDate.getDate()).padStart(2, "0");

            // Prepare the data to be sent to the server
            const updatedBlogPost = {
                title: this.blogTitle,
                body: this.blogHTML,
                updated_at: `${year}-${month}-${day}`,
            };

            try {
                const response = await axios.patch(
                    `http://localhost:3000/posts/${this.routeID}`, // Use the specific post ID in the URL
                    updatedBlogPost
                );

                console.log("Blog post updated successfully:", response.data);
                this.$toast.success("Blog post updated successfully!", {
                    position: "top-right",
                    timeout: 3000,
                });
                router.push({ name: "Blogs" });

                this.blogTitle = "";
                this.selectedAuthor = null;
                this.blogHTML = "";
            } catch (error) {
                // Handle any errors that occur during the request
                console.error("Error updating blog post:", error);
                this.$toast.warning("Error updating the post!", {
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
