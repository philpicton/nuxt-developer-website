// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import BaseHamburgerButton from "~/components/base/BaseHamburgerButton.vue";

describe("MainHamburgerButton", () => {
    it("renders button with SVG hamburger icon", async () => {
        const wrapper = await mountSuspended(BaseHamburgerButton);

        expect(wrapper.find("button").exists()).toBe(true);
        expect(wrapper.find("svg").exists()).toBe(true);
        expect(wrapper.findAll("path").length).toBe(3);
    });

    it("displays correct aria-label when menu is closed", async () => {
        const wrapper = await mountSuspended(BaseHamburgerButton, {
            props: {
                modelValue: false,
            },
        });

        const button = wrapper.find("button");
        expect(button.attributes("aria-label")).toBe(
            "Open main navigation menu",
        );
    });

    it("displays correct aria-label when menu is open", async () => {
        const wrapper = await mountSuspended(BaseHamburgerButton, {
            props: {
                modelValue: true,
            },
        });

        const button = wrapper.find("button");
        expect(button.attributes("aria-label")).toBe(
            "Close main navigation menu",
        );
    });

    it("applies opened class to lines when menu is open", async () => {
        const wrapper = await mountSuspended(BaseHamburgerButton, {
            props: {
                modelValue: true,
            },
        });

        const lines = wrapper.findAll("path.line");
        lines.forEach((line) => {
            expect(line.classes()).toContain("opened");
        });
    });

    it("does not apply opened class when menu is closed", async () => {
        const wrapper = await mountSuspended(BaseHamburgerButton, {
            props: {
                modelValue: false,
            },
        });

        const lines = wrapper.findAll("path.line");
        lines.forEach((line) => {
            expect(line.classes()).not.toContain("opened");
        });
    });

    it("emits update:modelValue when button is clicked", async () => {
        const wrapper = await mountSuspended(BaseHamburgerButton, {
            props: {
                modelValue: false,
            },
        });

        await wrapper.find("button").trigger("click");
        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    });

    it("toggles value on multiple clicks", async () => {
        const wrapper = await mountSuspended(BaseHamburgerButton, {
            props: {
                modelValue: false,
            },
        });

        const button = wrapper.find("button");
        await button.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);

        await wrapper.setProps({ modelValue: true });
        await button.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([false]);
    });
});
