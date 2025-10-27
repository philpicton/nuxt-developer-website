// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import MainColorModeSwitch from "~/components/main/MainColorModeSwitch.vue";

describe("MainColorModeSwitch", () => {
    it("renders a button with accessible label", async () => {
        const wrapper = await mountSuspended(MainColorModeSwitch);
        const button = wrapper.find("button");

        expect(button.exists()).toBe(true);
        expect(button.attributes("aria-label")).toBeTruthy();
        expect(button.attributes("aria-label")).toMatch(
            /Switch to (light|dark) mode/,
        );
    });
});
