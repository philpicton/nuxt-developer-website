import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Pagination from "~/components/content/ContentPagination.vue";

describe("Pagination", () => {
    it("does not render when totalPages is 1", async () => {
        const wrapper = await mountSuspended(Pagination, {
            props: {
                currentPage: 1,
                totalPages: 1,
            },
        });

        expect(wrapper.find("nav").exists()).toBe(false);
    });

    it("renders navigation when totalPages > 1", async () => {
        const wrapper = await mountSuspended(Pagination, {
            props: {
                currentPage: 1,
                totalPages: 3,
            },
        });

        const nav = wrapper.find("nav");
        expect(nav.exists()).toBe(true);
        expect(nav.attributes("aria-label")).toBe("Pagination");
    });

    it("renders correct number of page buttons", async () => {
        const wrapper = await mountSuspended(Pagination, {
            props: {
                currentPage: 2,
                totalPages: 5,
            },
        });

        // Should have: prev button + 5 page buttons + next button = 7 total
        const buttons = wrapper.findAll("button");
        expect(buttons.length).toBe(7);
    });

    it("disables previous button on first page", async () => {
        const wrapper = await mountSuspended(Pagination, {
            props: {
                currentPage: 1,
                totalPages: 3,
            },
        });

        const buttons = wrapper.findAll("button");
        const prevButton = buttons[0];
        expect(prevButton?.attributes("disabled")).toBeDefined();
    });

    it("disables next button on last page", async () => {
        const wrapper = await mountSuspended(Pagination, {
            props: {
                currentPage: 3,
                totalPages: 3,
            },
        });

        const buttons = wrapper.findAll("button");
        const nextButton = buttons[buttons.length - 1];
        expect(nextButton?.attributes("disabled")).toBeDefined();
    });

    it("emits goToPage event when page button clicked", async () => {
        const wrapper = await mountSuspended(Pagination, {
            props: {
                currentPage: 1,
                totalPages: 3,
            },
        });

        const buttons = wrapper.findAll("button");
        // Click page 2 button (index 2: prev, page1, page2)
        await buttons[2]?.trigger("click");

        expect(wrapper.emitted("goToPage")).toBeTruthy();
        expect(wrapper.emitted("goToPage")?.[0]).toEqual([2]);
    });

    it("highlights current page", async () => {
        const wrapper = await mountSuspended(Pagination, {
            props: {
                currentPage: 2,
                totalPages: 3,
            },
        });

        const buttons = wrapper.findAll("button");
        // Page 2 button is at index 2 (prev, page1, page2)
        const currentPageButton = buttons[2];
        expect(currentPageButton?.attributes("aria-current")).toBe("page");
    });
});
