// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import IndexPage from "~/pages/index.vue";

const mockHome = {
    title: "Hello World - Frontend Developer Template",
    description: "A modern Nuxt website template for frontend developers",
    body: { type: "root", children: [] },
};

mockNuxtImport("useAsyncData", () => {
    return () => ({
        data: ref(mockHome),
        pending: ref(false),
        error: ref(null),
        refresh: () => {},
    });
});

describe("Index Page", () => {
    it("renders Hello World heading", async () => {
        const wrapper = await mountSuspended(IndexPage, {
            route: "/",
            global: {
                stubs: {
                    ContentRenderer: {
                        template:
                            '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
                    },
                },
            },
        });

        expect(wrapper.text()).toContain("Hello World");
    });

    it("renders ContentRenderer when home data exists", async () => {
        const wrapper = await mountSuspended(IndexPage, {
            route: "/",
            global: {
                stubs: {
                    ContentRenderer: {
                        template:
                            '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
                    },
                },
            },
        });

        expect(wrapper.find('[data-testid="content-renderer"]').exists()).toBe(
            true,
        );
    });
});
