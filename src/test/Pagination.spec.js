import { shallowMount } from "@vue/test-utils";
import Pagination from "../components/Pagination.vue"; // Replace with your component path

describe("Pagination.vue", () => {
    it("renders the component correctly", () => {
        const wrapper = shallowMount(Pagination, {
            propsData: {
                maxVisibleButtons: 3,
                totalPages: 5,
                perPage: 10,
                currentPage: 1,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("displays the correct number of page buttons based on 'maxVisibleButtons' prop", () => {
        const wrapper = shallowMount(Pagination, {
            propsData: {
                maxVisibleButtons: 3,
                totalPages: 5,
                perPage: 10,
                currentPage: 1,
            },
        });

        const pageButtons = wrapper.findAll(".pagination-item button");

        expect(pageButtons.length).toBe(5); // Since 'maxVisibleButtons' is set to 3, plus the previous/first and next/last buttons
    });

    it("correctly disables the 'Previous' button when on the first page", async () => {
        const wrapper = shallowMount(Pagination, {
            propsData: {
                maxVisibleButtons: 3,
                totalPages: 5,
                perPage: 10,
                currentPage: 1,
            },
        });

        const previousButton = wrapper.find(
            ".pagination-item button[disabled]"
        );

        expect(previousButton.exists()).toBe(true);

        // Triggering click should not emit the 'pagechanged' event since it's disabled
        await previousButton.trigger("click");

        expect(wrapper.emitted().pagechanged).toBeFalsy();
    });

    it("correctly disables the 'Next' button when on the last page", async () => {
        const wrapper = shallowMount(Pagination, {
            propsData: {
                maxVisibleButtons: 3,
                totalPages: 5,
                perPage: 10,
                currentPage: 5,
            },
        });

        const nextButton = wrapper.find(".pagination-item button[disabled]");

        expect(nextButton.exists()).toBe(true);

        // Triggering click should not emit the 'pagechanged' event since it's disabled
        await nextButton.trigger("click");

        expect(wrapper.emitted().pagechanged).toBeFalsy();
    });

    it("correctly emits 'pagechanged' event when clicking on page buttons", async () => {
        const wrapper = shallowMount(Pagination, {
            propsData: {
                maxVisibleButtons: 3,
                totalPages: 5,
                perPage: 10,
                currentPage: 3,
            },
        });

        const pageButton2 = wrapper.findAll(".pagination-item button").at(1);

        expect(pageButton2.text()).toBe("Previous");

        await pageButton2.trigger("click");

        // Triggering click on page button should emit the 'pagechanged' event
        expect(wrapper.emitted().pagechanged).toBeTruthy();
        expect(wrapper.emitted().pagechanged.length).toBe(1);
        expect(wrapper.emitted().pagechanged[0]).toEqual([2]);
    });
});
