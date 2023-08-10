import { shallowMount, createLocalVue } from "@vue/test-utils";
import BlogCard from "../components/BlogCard.vue";
import Vuex from "vuex";
import postsModule from "../store/modules/posts";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const mockRoute = {
    name: "ViewPost",
    params: { id: 1 },
};

const router = new VueRouter({
    routes: [
        {
            path: "/view-post/:id", // Adjust the path based on your router configuration
            name: "ViewPost",
        },
    ],
});

describe("BlogCard.vue", () => {
    let wrapper;
    let store;
    let actions;
    let getters;

    beforeEach(() => {
        actions = {
            deletePost: vi.fn(),
            openEditModal: vi.fn(),
        };
        getters = {
            "posts/getAuthorById": vi.fn().mockReturnValue({
                id: 123,
                name: "John Doe",
            }),
        };
        store = new Vuex.Store({
            modules: {
                posts: {
                    actions,
                    getters,
                    ...postsModule,

                    namespaced: true,
                },
                editModal: {
                    actions,
                },
            },
        });
        wrapper = shallowMount(BlogCard, {
            localVue,
            store,
            propsData: {
                post: {
                    id: 1,
                    title: "Test Post",
                    authorId: 123,
                    created_at: "2023-08-01T10:00:00Z",
                    updated_at: "2023-08-02T15:30:00Z",
                },
            },
        });
    });
    it("renders the component correctly", () => {
        expect(wrapper.exists()).toBe(true);
    });
    it("displays correct post information", async () => {
        const title = wrapper.find("h4");
        const author = wrapper.find("h6");
        const createdAt = wrapper.find("h6");

        expect(title.text()).toBe("Test Post");
        setTimeout(() => {
            expect(author.text()).toContain("John Doe");
            expect(createdAt.text()).toContain("Created at:");
            done();
        }, 1000);
    });

    it("clicks on 'View The Post' link", async () => {
        const wrapper = shallowMount(BlogCard, {
            localVue,
            store,
            propsData: {
                post: {
                    id: 1,
                    title: "Test Post",
                    authorId: 123,
                    created_at: "2023-08-01T10:00:00Z",
                    updated_at: "2023-08-02T15:30:00Z",
                },
            },
            router,
        });
        const viewPostLink = wrapper.findComponent({ name: "RouterLink" });

        // Initially, isLinkClicked should be false
        expect(wrapper.vm.isLinkClicked).toBe(false);

        // Trigger the click event on the router-link component
        await viewPostLink.trigger("click");

        // After the click, isLinkClicked should be true
        expect(wrapper.vm.isLinkClicked).toBe(true);
    });
    it("opens a window confirmation when delete icon is clicked and deletes the post", async () => {
        window.confirm = vi.fn(() => true);
        wrapper.vm.deletePostFromAPI = vi.fn();

        const deleteIcon = wrapper.find(".trashbin");

        await deleteIcon.trigger("click");

        expect(window.confirm).toHaveBeenCalled();
        expect(wrapper.vm.deletePostFromAPI).toHaveBeenCalled();
    });

    it("opens the edit modal when edit icon is clicked", async () => {
        const editIcon = wrapper.find(".edit");

        await editIcon.trigger("click");

        expect(wrapper.vm.isEditPostModalVisible).toBe(true);
        expect(wrapper.vm.postIdToEdit).toBe(1);
    });

    it("displays 'Edited at' date when the post is edited", async () => {
        await wrapper.setProps({
            post: {
                ...wrapper.props("post"),
                updated_at: "2023-08-02T15:30:00Z",
            },
        });
        const editedAt = wrapper.find(".edited-created");

        expect(editedAt.text()).toContain("Edited at:");
    });

    it("does not display 'Edited at' date when the post is not edited", async () => {
        await wrapper.setProps({
            post: {
                ...wrapper.props("post"),
                updated_at: "2023-08-01T10:00:00Z",
            },
        });

        const editedAt = wrapper.find("h6");

        expect(editedAt.text()).not.toContain("Edited at:");
    });
});
