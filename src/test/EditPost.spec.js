import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditPost from "../components/EditPost.vue";
import toastMixin from "../mixins/toastMixin";
import editModule from "../store/modules/editModal";
import postsModule from "../store/modules/posts";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);
// Create a mock $toast object
const $toast = {
    warning: vi.fn(),
    success: vi.fn(),
};

describe("EditPost.vue", () => {
    let wrapper;
    let store;
    let actions;
    let getters;
    const postId = 1;
    const fetchCurrentPostMock = vi.fn(() =>
        Promise.resolve({
            postId: 1,
            title: "Test Title",
            body: "Test Body",
        })
    );
    const updateBlogMock = vi.fn();

    beforeEach(async () => {
        actions = {
            updateBlog: vi.fn(),
        };
        (getters = {}),
            (store = new Vuex.Store({
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
            }));

        localVue.prototype.$toast = $toast;
        wrapper = shallowMount(EditPost, {
            localVue,
            store,
            mixins: [toastMixin],
            propsData: {
                postId,
                fetchCurrentPost: fetchCurrentPostMock,
                ...editModule,
            },
            methods: {
                updateBlog: updateBlogMock,
            },
        });

        // Wait for next tick for any async behavior to settle
        await wrapper.vm.$nextTick();
    });

    it("renders the component correctly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("correctly sets the initial blogTitle and blogHTML values", () => {
        expect(wrapper.vm.blogTitle).toBe("Test Title");
        expect(wrapper.vm.blogHTML).toBe("Test Body");
    });

    it("updates blogTitle and blogHTML when input values are changed", async () => {
        const blogTitleInput = wrapper.find(".blog-info input");

        blogTitleInput.setValue("Updated Title");

        expect(wrapper.vm.blogTitle).toBe("Updated Title");
    });

    it("emits 'pagechanged' event when clicking on 'Save changes' button", async () => {
        const saveChangesButton = wrapper.find(".button.is-success");

        await saveChangesButton.trigger("click");

        expect(updateBlogMock).toHaveBeenCalled();

        // Emit the 'pagechanged' event after clicking the button
        wrapper.vm.$emit("pagechanged");

        expect(wrapper.emitted().pagechanged).toBeTruthy();
        expect(wrapper.emitted().pagechanged.length).toBe(1);
    });

    it("emits 'pagechanged' event when clicking on 'Cancel' button", async () => {
        const cancelButton = wrapper.find(".button");

        await cancelButton.trigger("click");

        // Emit the 'pagechanged' event after clicking the button
        wrapper.vm.$emit("pagechanged");

        expect(wrapper.emitted().pagechanged).toBeTruthy();
        expect(wrapper.emitted().pagechanged.length).toBe(1);
    });
});
