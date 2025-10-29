// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ContentBlogPostsList from "~/components/content/ContentBlogPostsList.vue";

describe("ContentBlogPostsList", () => {
    const mockPosts = [
        {
            title: "Test Post 1",
            path: "/writing/test-post-1",
            description: "Description 1",
            tags: ["vue", "nuxt"],
        },
        {
            title: "Test Post 2",
            path: "/writing/test-post-2",
            description: "Description 2",
            tags: ["javascript"],
        },
    ];

    it("renders correct number of posts with titles and descriptions", async () => {
        const wrapper = await mountSuspended(ContentBlogPostsList, {
            props: { posts: mockPosts },
        });

        expect(wrapper.findAll("li")).toHaveLength(mockPosts.length);
        expect(wrapper.text()).toContain("Test Post 1");
        expect(wrapper.text()).toContain("Description 1");
    });

    it("renders BlogTag components for each tag", async () => {
        const wrapper = await mountSuspended(ContentBlogPostsList, {
            props: { posts: mockPosts },
        });

        const blogTags = wrapper.findAllComponents({ name: "ContentBlogTag" });
        const totalTags = mockPosts.reduce(
            (sum, post) => sum + post.tags.length,
            0,
        );

        expect(blogTags).toHaveLength(totalTags);
    });

    it("creates NuxtLinks with correct paths", async () => {
        const wrapper = await mountSuspended(ContentBlogPostsList, {
            props: { posts: mockPosts },
        });

        const listItems = wrapper.findAll("li");
        listItems.forEach((item, index) => {
            const link = item.findComponent({ name: "NuxtLink" });
            expect(link.props("to")).toBe(mockPosts[index]?.path);
        });
    });

    it("handles empty posts array", async () => {
        const wrapper = await mountSuspended(ContentBlogPostsList, {
            props: { posts: [] },
        });

        expect(wrapper.findAll("li")).toHaveLength(0);
    });
});
