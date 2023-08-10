import { shallowMount } from "@vue/test-utils";
import Footer from "../components/Footer.vue"; // Replace with your component path

describe("Footer.vue", () => {
    it("renders the component correctly", () => {
        const wrapper = shallowMount(Footer);
        expect(wrapper.exists()).toBe(true);
    });

    it("displays the correct social media links", () => {
        const wrapper = shallowMount(Footer);
        const youtubeLink = wrapper.find(
            "a[href='https://www.youtube.com/TeltonikaNetworks']"
        );
        const twitterLink = wrapper.find(
            "a[href='https://www.twitter.com/TeltonikaNET']"
        );
        const instagramLink = wrapper.find(
            "a[href='https://www.instagram.com/teltonikanetworksofficial/']"
        );
        const linkedinLink = wrapper.find(
            "a[href='https://www.linkedin.com/company/teltonika-networks/']"
        );

        expect(youtubeLink.exists()).toBe(true);
        expect(twitterLink.exists()).toBe(true);
        expect(instagramLink.exists()).toBe(true);
        expect(linkedinLink.exists()).toBe(true);
    });

    // it("correctly navigates to 'Blogs' route when the link is clicked", () => {
    //     const wrapper = shallowMount(Footer);
    //     const blogsLink = wrapper.find(".col-2").find(".link");

    //     expect(blogsLink.attributes("to")).toBe("{ name: 'Blogs' }");
    // });

    // it("correctly navigates to 'NewPost' route when the link is clicked", () => {
    //     const wrapper = shallowMount(Footer);
    //     const newPostLink = wrapper.find(".col-2").findAll(".link").at(1);

    //     expect(newPostLink.attributes("to")).toBe("{ name: 'NewPost' }");
    // });

    it("displays the correct copyright message", () => {
        const wrapper = shallowMount(Footer);
        const copyrightText = wrapper.find(".right").find("p");

        expect(copyrightText.text()).toBe(
            "Copyright © 2023 All Rights Reserved"
        );
    });
});
