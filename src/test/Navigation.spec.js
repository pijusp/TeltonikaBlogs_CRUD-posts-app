import {
    shallowMount,
    createLocalVue,
    createRouter,
    RouterLinkStub,
} from "@vue/test-utils";
import Navigation from "../components/Navigation.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Navigation.vue", () => {
    it("renders correct router-links", () => {
        const mockRoute = {
            name: "Blogs",
            path: "/",
        };

        const wrapper = shallowMount(Navigation, {
            global: {
                mocks: {
                    $route: mockRoute,
                },
            },
        });

        // Assert that the "Blogs" router-link has the correct "to" attribute
        const blogsRouterLink = wrapper.find(
            ".desktop-menu .link:nth-child(1)"
        );
        console.log(blogsRouterLink.attributes());
        expect(blogsRouterLink.attributes("to")).toBe("Blogs");
    });

    // it("toggles the mobile navigation when the menu icon is clicked", async () => {
    //     const wrapper = shallowMount(Navigation, {
    //         localVue,
    //         router,
    //     });
    //     const menuIcon = wrapper.find(".menu-icon");

    //     expect(wrapper.vm.mobileNav).toBe(false);

    //     await menuIcon.trigger("click");

    //     expect(wrapper.vm.mobileNav).toBe(true);

    //     await menuIcon.trigger("click");

    //     expect(wrapper.vm.mobileNav).toBe(false);
    // });

    // it("emits the 'search' event with the correct payload when the input value changes", async () => {
    //     const wrapper = shallowMount(Navigation);
    //     const input = wrapper.find(".search-input");

    //     const testSearchQuery = "Test Search Query";

    //     await input.setValue(testSearchQuery);

    //     expect(wrapper.vm.searchQuery).toBe(testSearchQuery);
    //     expect(wrapper.emitted("search")).toBeTruthy();
    //     expect(wrapper.emitted("search")[0]).toEqual([testSearchQuery]);
    // });

    // it("correctly navigates to 'Blogs' and 'NewPost' routes when links are clicked", () => {
    //     const wrapper = shallowMount(Navigation);
    //     const blogsLink = wrapper.find(".desktop-menu").findAll(".link").at(0);
    //     const newPostLink = wrapper
    //         .find(".desktop-menu")
    //         .findAll(".link")
    //         .at(1);
    //     // console.log(blogsLink.attributes().to);
    //     console.log(wrapper.findAll(".link").at(0).attributes().to);
    //     // expect(newPostLink.attributes("to")).toBe("{ name: 'NewPost' }");
    // });
    // susikurti routeri
    // susirasti elementa, ji paspausti, ir jis redirecta padaro
    it('redirects to "/" when "Blogs" link is clicked', async () => {
        const mockRouter = {
            push: vi.fn(),
        };
        const wrapper = shallowMount(Navigation, {
            global: {
                mocks: { $router: mockRouter },
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        const navbarLink = wrapper.findAll(".link").at(0);

        await navbarLink.trigger("click");

        await localVue.nextTick();
        expect(mockRouter.push).toHaveBeenCalledOnce();
        expect(mockRouter.push).toHaveBeenCalledWith("/");

        // // Click the "Blogs" link
        // await wrapper.findAll(".link").at(0).trigger("click");

        // // Wait for router navigation to complete
        // await localVue.nextTick();

        // // Expect the current route to be "/"
        // expect(router.currentRoute.path).toBe("/");
    });
    it('redirects to "/new-post" when "Create a new post" link is clicked', async () => {
        const router = new VueRouter({
            mode: "history",
            routes: [
                {
                    path: "/",
                    name: "Blogs",
                },
                {
                    path: "/new-post",
                    name: "New Post",
                },
            ],
        });
        const wrapper = shallowMount(Navigation, {
            global: {
                plugins: [router],
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        // Find the link with the text "Create a new post"
        const newPostLink = wrapper.findComponent({
            name: "RouterLinkStub",
            text: "Create a new post",
        });

        // Trigger a "click" event on the link
        await newPostLink.trigger("click");

        // Wait for router navigation to complete
        await localVue.nextTick();

        // Expect the current route to be "/new-post"
        expect(wrapper.vm.currentRoutePath).toBe("/new-post");
    });
    // it('redirects to "/new-post" when "New Post" link is clicked', async () => {
    //     const router = new VueRouter({
    //         mode: "history",
    //         routes: [
    //             {
    //                 path: "/",
    //                 name: "Blogs",
    //             },
    //             {
    //                 path: "/new-post",
    //                 name: "New Post",
    //             },
    //         ],
    //     });
    //     const wrapper = shallowMount(Navigation, {
    //         global: {
    //             plugins: [router],
    //         },
    //         stubs: {
    //             RouterLink: RouterLinkStub,
    //         },
    //     });

    //     // Click the "New Post" link
    //     await wrapper.findAll(".link").at(1).trigger("click");

    //     // Wait for router navigation to complete
    //     await localVue.nextTick();

    //     // Expect the current route to be "/new-post"
    //     expect(router.currentRoute.path).toBe("/new-post");
    // });

    // it("correctly navigates to 'Blogs' and 'NewPost' routes in the mobile nav when links are clicked", () => {
    //     const wrapper = shallowMount(Navigation);
    //     const mobileBlogsLink = wrapper
    //         .find(".mobile-nav")
    //         .findAll(".link")
    //         .at(0);
    //     const mobileNewPostLink = wrapper
    //         .find(".mobile-nav")
    //         .findAll(".link")
    //         .at(1);

    //     expect(mobileBlogsLink.attributes("to")).toBe("{ name: 'Blogs' }");
    //     expect(mobileNewPostLink.attributes("to")).toBe("{ name: 'NewPost' }");
    // });
});
