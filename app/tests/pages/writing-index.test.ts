// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import WritingIndexPage from "~/pages/writing/index.vue";

const mockPosts = [
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
];

mockNuxtImport("useAsyncData", () => {
    return () => ({
        data: ref(mockPosts),
        pending: ref(false),
        error: ref(null),
        refresh: () => {},
    });
});

describe("Writing Index Page", () => {
    it("renders heading and pagination controls", async () => {
        const wrapper = await mountSuspended(WritingIndexPage, {
            route: "/writing",
        });

        expect(wrapper.find("h1").text()).toBe("Recent Posts");
        expect(wrapper.findAll("button").length).toBeGreaterThan(0);
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

        const buttons = wrapper.findAll("button");
        // Should have prev/next buttons at minimum
        expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
});
