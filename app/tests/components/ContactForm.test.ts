// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import MainContactForm from "~/components/main/MainContactForm.vue";

describe("MainContactForm", () => {
    it("renders form with all required fields", async () => {
        const wrapper = await mountSuspended(MainContactForm);

        expect(wrapper.find("form").exists()).toBe(true);
        expect(wrapper.find("#name").exists()).toBe(true);
        expect(wrapper.find("#email").exists()).toBe(true);
        expect(wrapper.find("#phone").exists()).toBe(true);
        expect(wrapper.find("#message").exists()).toBe(true);
    });

    it("displays error message for invalid name", async () => {
        const wrapper = await mountSuspended(MainContactForm);
        const nameInput = wrapper.find("#name");

        await nameInput.setValue("a");
        await nameInput.trigger("blur");

        expect(wrapper.text()).toContain("Name is required");
    });

    it("displays error message for invalid email", async () => {
        const wrapper = await mountSuspended(MainContactForm);
        const emailInput = wrapper.find("#email");

        await emailInput.setValue("invalid-email");
        await emailInput.trigger("blur");

        expect(wrapper.text()).toContain("Must be a valid email address");
    });

    it("displays error message for invalid phone", async () => {
        const wrapper = await mountSuspended(MainContactForm);
        const phoneInput = wrapper.find("#phone");

        await phoneInput.setValue("123");
        await phoneInput.trigger("blur");

        expect(wrapper.text()).toContain("valid phone number");
    });

    it("submit button is disabled when form has errors", async () => {
        const wrapper = await mountSuspended(MainContactForm);
        const button = wrapper.find("button");

        // Initially should be disabled (no name or email)
        expect(button.attributes("disabled")).toBeDefined();
    });

    it("includes honeypot field that is hidden", async () => {
        const wrapper = await mountSuspended(MainContactForm);
        const honeypot = wrapper.find('input[name="website"]');

        expect(honeypot.exists()).toBe(true);
        expect(honeypot.classes()).toContain("hidden");
    });
});
