// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SiteFooter from "~/components/SiteFooter.vue";

describe("SiteFooter", () => {
    it("renders footer with copyright and current year", async () => {
        const wrapper = await mountSuspended(SiteFooter);
        const currentYear = new Date().getFullYear();

        expect(wrapper.find("footer").exists()).toBe(true);
        expect(wrapper.text()).toContain("©");
        expect(wrapper.text()).toContain(currentYear.toString());
        expect(wrapper.text()).toContain("[Your Name]");
        expect(wrapper.text()).toContain("Built with Nuxt 3");
    });
});
