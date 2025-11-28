// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { h } from "vue";
import BaseGlitchText from "~/components/base/BaseGlitchText.vue";

describe("BaseGlitchText", () => {
    it("renders slot content correctly", async () => {
        const wrapper = await mountSuspended(BaseGlitchText, {
            slots: {
                default: () => h("h1", "Glitch Effect"),
            },
        });

        expect(wrapper.find("h1").exists()).toBe(true);
        expect(wrapper.text()).toContain("Glitch Effect");
    });

    it("preserves HTML attributes in slotted content", async () => {
        const wrapper = await mountSuspended(BaseGlitchText, {
            slots: {
                default: () =>
                    h(
                        "span",
                        { class: "custom-class", "data-test": "value" },
                        "Content",
                    ),
            },
        });

        const span = wrapper.find("span");
        expect(span.classes()).toContain("custom-class");
        expect(span.attributes("data-test")).toBe("value");
    });
});
