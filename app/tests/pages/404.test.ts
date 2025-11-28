// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import NotFoundPage from "~/pages/[404].vue";

describe("404 Page", () => {
    it("renders 404 heading and error message", async () => {
        const wrapper = await mountSuspended(NotFoundPage);

        expect(wrapper.find("h1").text()).toContain("404");
        expect(wrapper.find("h1").text()).toContain("Page not found");
        expect(wrapper.text()).toContain("That's all we know");
    });
});
