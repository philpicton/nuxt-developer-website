// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import BaseSiteHeader from "~/components/base/BaseSiteHeader.vue";

describe("BaseSiteHeader", () => {
    it("renders nav with expected navigation links", async () => {
        const wrapper = await mountSuspended(BaseSiteHeader);
        const expectedLinks = [
            "home",
            "about",
            "writing",
            "projects",
            "contact",
        ];

        expect(wrapper.find("nav").exists()).toBe(true);
        expectedLinks.forEach((link) => {
            expect(wrapper.text()).toContain(link);
        });
    });

    it("includes ColorModeSwitch component", async () => {
        const wrapper = await mountSuspended(BaseSiteHeader);

        expect(
            wrapper.findComponent({ name: "BaseColorModeSwitch" }).exists(),
        ).toBe(true);
    });

    it("includes HamburgerButton component", async () => {
        const wrapper = await mountSuspended(BaseSiteHeader);

        expect(
            wrapper.findComponent({ name: "BaseHamburgerButton" }).exists(),
        ).toBe(true);
    });

    it("has mobile menu toggle functionality", async () => {
        const wrapper = await mountSuspended(BaseSiteHeader);
        const hamburgerButton = wrapper.findComponent({
            name: "BaseHamburgerButton",
        });

        expect(hamburgerButton.exists()).toBe(true);
        // @ts-expect-error typescript does not infer the type of the component
        expect(wrapper.vm.open).toBe(false);
        await hamburgerButton.find("button").trigger("click");
        // @ts-expect-error typescript does not infer the type of the component
        expect(wrapper.vm.open).toBe(true);
        await hamburgerButton.find("button").trigger("click");
        // @ts-expect-error typescript does not infer the type of the component
        expect(wrapper.vm.open).toBe(false);
    });

    it("closes menu when navigation link is clicked", async () => {
        const wrapper = await mountSuspended(BaseSiteHeader);
        const hamburgerButton = wrapper.findComponent({
            name: "BaseHamburgerButton",
        });

        if (hamburgerButton.exists()) {
            await hamburgerButton.find("button").trigger("click");
            // @ts-expect-error typescript does not infer the type of the component
            expect(wrapper.vm.open).toBe(true);
            const firstLink = wrapper.find("li a");
            await firstLink.trigger("click");
            // @ts-expect-error typescript does not infer the type of the component
            expect(wrapper.vm.open).toBe(false);
        }
    });
});
