import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import TechPill from "~/components/content/ContentTechPill.vue";

describe("TechPill", () => {
    it("renders with provided text", async () => {
        const wrapper = await mountSuspended(TechPill, {
            props: {
                text: "Vue.js",
            },
        });

        expect(wrapper.text()).toBe("Vue.js");
    });

    it("renders with default empty text when not provided", async () => {
        const wrapper = await mountSuspended(TechPill, {
            props: {},
        });

        expect(wrapper.text()).toBe("");
    });

    it("applies correct styling classes", async () => {
        const wrapper = await mountSuspended(TechPill, {
            props: {
                text: "TypeScript",
            },
        });

        expect(wrapper.text()).toBe("TypeScript");
        const span = wrapper.find("span");
        expect(span.classes()).toContain("rounded-full");
        expect(span.classes()).toContain("text-xs");
    });
});
