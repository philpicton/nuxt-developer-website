// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ContactPage from "~/pages/contact/index.vue";

describe("Contact Page", () => {
    it("renders heading and instructions", async () => {
        const wrapper = await mountSuspended(ContactPage, {
            route: "/contact",
        });

        expect(wrapper.find("h1").text()).toBe("Contact page");
        expect(wrapper.text()).toContain("fill in the form");
    });

    it("renders ContactForm component", async () => {
        const wrapper = await mountSuspended(ContactPage, {
            route: "/contact",
        });

        expect(wrapper.findComponent({ name: "MainContactForm" }).exists()).toBe(
            true,
        );
    });
});
