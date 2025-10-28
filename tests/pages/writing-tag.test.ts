// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import WritingTagPage from "~/pages/writing/tag/[slug].vue";

const mockPosts = [
    {
        title: "Vue Best Practices",
        path: "/writing/vue-best-practices",
        description: "Learn the best practices for Vue development",
        tags: ["vue", "frontend"],
    },
    {
        title: "Vue 3 Composition API",
        path: "/writing/vue-composition-api",
        description: "Deep dive into Vue 3 Composition API",
        tags: ["vue", "javascript"],
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

describe("Writing Tag Page", () => {
    it("renders heading with tag name from route params", async () => {
        const wrapper = await mountSuspended(WritingTagPage, {
            route: "/writing/tag/vue",
        });

        const heading = wrapper.find("h1");
        expect(heading.exists()).toBe(true);
        expect(heading.text()).toContain('Posts tagged with "vue"');
    });

    it("renders list of mocked posts", async () => {
        const wrapper = await mountSuspended(WritingTagPage, {
            route: "/writing/tag/vue",
        });

        const list = wrapper.find("ul");
        expect(list.exists()).toBe(true);

        const listItems = wrapper.findAll("li");
        expect(listItems.length).toBe(mockPosts.length);
    });

    it("displays post titles and descriptions from mocked data", async () => {
        const wrapper = await mountSuspended(WritingTagPage, {
            route: "/writing/tag/vue",
        });

        // Check that mocked post data appears in the template
        expect(wrapper.text()).toContain("Vue Best Practices");
        expect(wrapper.text()).toContain(
            "Learn the best practices for Vue development",
        );
        expect(wrapper.text()).toContain("Vue 3 Composition API");
        expect(wrapper.text()).toContain(
            "Deep dive into Vue 3 Composition API",
        );
    });

    it("renders BlogTag components for each post tag", async () => {
        const wrapper = await mountSuspended(WritingTagPage, {
            route: "/writing/tag/vue",
        });

        const blogTags = wrapper.findAllComponents({ name: "ContentBlogTag" });
        expect(blogTags.length).toBeGreaterThan(0);
    });

    it("renders BackButton component", async () => {
        const wrapper = await mountSuspended(WritingTagPage, {
            route: "/writing/tag/vue",
        });

        expect(
            wrapper.findComponent({ name: "ContentBackButton" }).exists(),
        ).toBe(true);
    });
});
