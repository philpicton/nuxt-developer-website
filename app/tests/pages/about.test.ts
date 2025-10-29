// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import AboutPage from "~/pages/about/index.vue";

const mockAbout = {
    title: "About - [Your Name]",
    description: "Learn more about [Your Name] and their work",
    body: { type: "root", children: [] },
};

mockNuxtImport("useAsyncData", () => {
    return () => ({
        data: ref(mockAbout),
        pending: ref(false),
        error: ref(null),
        refresh: () => {},
    });
});

describe("About Page", () => {
    it("renders ContentRenderer when about data exists", async () => {
        const wrapper = await mountSuspended(AboutPage, {
            route: "/about",
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
