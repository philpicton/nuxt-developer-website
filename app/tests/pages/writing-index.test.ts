// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import WritingIndexPage from "~/pages/writing/index.vue";

const mockPostsData = ref([
    {
        title: "First Blog Post",
        path: "/writing/first-post",
        description: "This is the first post",
        tags: ["vue", "testing"],
    },
    {
        title: "Second Blog Post",
        path: "/writing/second-post",
        description: "This is the second post",
        tags: ["nuxt", "typescript"],
    },
    {
        title: "Third Blog Post",
        path: "/writing/third-post",
        description: "This is the third post",
        tags: ["javascript"],
    },
]);

mockNuxtImport("useAsyncData", () => {
    return () => ({
        data: mockPostsData,
        pending: ref(false),
        error: ref(null),
        refresh: () => {},
    });
});

describe("Writing Index Page", () => {
    it("does not render pagination with few posts, then shows it when more are added", async () => {
        const wrapper = await mountSuspended(WritingIndexPage, {
            route: "/writing",
        });

        // With only 3 posts and 5 per page, pagination should NOT render
        let pagination = wrapper.findComponent({ name: "ContentPagination" });
        expect(pagination.exists()).toBe(false);

        // Add more posts to require pagination
        mockPostsData.value.push(
            {
                title: "Fourth Blog Post",
                path: "/writing/fourth-post",
                description: "This is the fourth post",
                tags: ["vue"],
            },
            {
                title: "Fifth Blog Post",
                path: "/writing/fifth-post",
                description: "This is the fifth post",
                tags: ["nuxt"],
            },
            {
                title: "Sixth Blog Post",
                path: "/writing/sixth-post",
                description: "This is the sixth post",
                tags: ["testing"],
            },
        );

        await wrapper.vm.$nextTick();

        // Now with 6 posts and 5 per page, we should have 2 pages, so pagination should render
        pagination = wrapper.findComponent({ name: "ContentPagination" });
        expect(pagination.exists()).toBe(true);
    });

    it("renders BlogPostsList with mocked posts", async () => {
        const wrapper = await mountSuspended(WritingIndexPage, {
            route: "/writing",
        });

        // BlogPostsList should exist when posts are present
        const blogPostsList = wrapper.findComponent({
            name: "ContentBlogPostsList",
        });
        expect(blogPostsList.exists()).toBe(true);

        // Verify the posts prop is passed correctly
        expect(blogPostsList.props("posts")).toBeDefined();
        expect(blogPostsList.props("posts").length).toBeGreaterThan(0);
    });

    it("displays post data in template", async () => {
        const wrapper = await mountSuspended(WritingIndexPage, {
            route: "/writing",
        });

        // Should not show the fallback message when posts exist
        expect(wrapper.text()).not.toContain("Sorry, nothing found");
    });

    it("pagination controls are interactive", async () => {
        const wrapper = await mountSuspended(WritingIndexPage, {
            route: "/writing",
        });

        const pagination = wrapper.findComponent({ name: "ContentPagination" });
        expect(pagination.exists()).toBe(true);
        expect(pagination.props("currentPage")).toBeDefined();
        expect(pagination.props("totalPages")).toBeDefined();
    });
});
