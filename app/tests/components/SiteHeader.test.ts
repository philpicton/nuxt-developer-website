// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import MainSiteHeader from "~/components/main/MainSiteHeader.vue";

describe("MainSiteHeader", () => {
    it("renders nav with expected navigation links", async () => {
        const wrapper = await mountSuspended(MainSiteHeader);
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
        const wrapper = await mountSuspended(MainSiteHeader);

        expect(
            wrapper.findComponent({ name: "MainColorModeSwitch" }).exists(),
        ).toBe(true);
    });

    it("has mobile menu toggle functionality", async () => {
        const wrapper = await mountSuspended(MainSiteHeader);
        const buttons = wrapper.findAll("button");
        const menuButton = buttons.find(
            (btn) => btn.attributes("aria-label") === "Main menu",
        );

        expect(menuButton).toBeDefined();
        if (menuButton) {
            // @ts-expect-error typescript does not infer the type of the component
            expect(wrapper.vm.open).toBe(false);
            await menuButton.trigger("click");
            // @ts-expect-error typescript does not infer the type of the component
            expect(wrapper.vm.open).toBe(true);
            await menuButton.trigger("click");
            // @ts-expect-error typescript does not infer the type of the component
            expect(wrapper.vm.open).toBe(false);
        }
    });

    it("closes menu when navigation link is clicked", async () => {
        const wrapper = await mountSuspended(MainSiteHeader);
        const buttons = wrapper.findAll("button");
        const menuButton = buttons.find(
            (btn) => btn.attributes("aria-label") === "Main menu",
        );

        if (menuButton) {
            await menuButton.trigger("click");
            // @ts-expect-error typescript does not infer the type of the component
            expect(wrapper.vm.open).toBe(true);
            const firstLink = wrapper.find("li a");
            await firstLink.trigger("click");
            // @ts-expect-error typescript does not infer the type of the component
            expect(wrapper.vm.open).toBe(false);
        }
    });
});
