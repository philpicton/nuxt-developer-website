// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { h } from "vue";
import ContentBackButton from "~/components/content/ContentBackButton.vue";
// Create reusable spies
const push = vi.fn();
const back = vi.fn();
const replace = vi.fn();

// Mock the Nuxt useRouter composable
mockNuxtImport("useRouter", () => {
    return () => ({
        push,
        back,
        replace,
    });
});

describe("ContentBackButton", () => {
    beforeEach(() => {
        push.mockReset();
        back.mockReset();
        replace.mockReset();
    });

    it("renders button with SVG icon and text", async () => {
        const wrapper = await mountSuspended(ContentBackButton);

        expect(wrapper.find("button").exists()).toBe(true);
        expect(wrapper.find("svg").exists()).toBe(true);
        expect(wrapper.find("small").exists()).toBe(true);
        expect(wrapper.text()).toContain("go back");
    });

    it("accepts custom slot content", async () => {
        const wrapper = await mountSuspended(ContentBackButton, {
            slots: {
                default: () => h("span", "Return Home"),
            },
        });

        expect(wrapper.text()).toContain("Return Home");
    });

    it("navigates to specified path when 'to' prop is provided", async () => {
        const wrapper = await mountSuspended(ContentBackButton, {
            props: { to: "/writing" },
        });

        await wrapper.find("button").trigger("click");
        expect(push).toHaveBeenCalledWith("/writing");
        expect(back).not.toHaveBeenCalled();
    });

    it("navigates back in history when no 'to' prop provided", async () => {
        const wrapper = await mountSuspended(ContentBackButton, {
            props: {},
        });

        await wrapper.find("button").trigger("click");
        expect(push).not.toHaveBeenCalled();
        expect(back).toHaveBeenCalled();
    });
});
