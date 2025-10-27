// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import WritingSlugPage from "~/pages/writing/[slug].vue";

const mockPost = {
    title: "Test Post",
    description: "Test Description",
    date: "2024-01-01",
    tags: ["test", "blog"],
    body: { type: "root", children: [] },
};

mockNuxtImport("useAsyncData", () => {
    return () => ({
        data: ref(mockPost),
        pending: ref(false),
        error: ref(null),
        refresh: () => {},
    });
});

describe("Writing Slug Page", () => {
    it("renders article with post title when data exists", async () => {
        const wrapper = await mountSuspended(WritingSlugPage, {
            route: "/writing/test-post",
            global: {
                stubs: {
                    ContentRenderer: {
                        template:
                            '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
                    },
                },
            },
        });

        expect(wrapper.find("article").exists()).toBe(true);
        expect(wrapper.find("h2").exists()).toBe(true);
        expect(wrapper.text()).toContain("Test Post");
    });

    it("renders BackButton component", async () => {
        const wrapper = await mountSuspended(WritingSlugPage, {
            route: "/writing/test-post",
            global: {
                stubs: {
                    ContentRenderer: {
                        template:
                            '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
                    },
                },
            },
        });

        expect(wrapper.findComponent({ name: "ContentBackButton" }).exists()).toBe(
            true,
        );
    });

    it("renders ContentRenderer for post body", async () => {
        const wrapper = await mountSuspended(WritingSlugPage, {
            route: "/writing/test-post",
            global: {
                stubs: {
                    ContentRenderer: {
                        template:
                            '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
                    },
                },
            },
        });

        // Check if ContentRenderer stub is present
        expect(wrapper.find('[data-testid="content-renderer"]').exists()).toBe(
            true,
        );
    });
});
