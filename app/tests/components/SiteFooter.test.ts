// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import MainSiteFooter from "~/components/main/MainSiteFooter.vue";

describe("MainSiteFooter", () => {
    it("renders footer with copyright and current year", async () => {
        const wrapper = await mountSuspended(MainSiteFooter);
        const currentYear = new Date().getFullYear();

        expect(wrapper.find("footer").exists()).toBe(true);
        expect(wrapper.text()).toContain("©");
        expect(wrapper.text()).toContain(currentYear.toString());
        expect(wrapper.text()).toContain("[Your Name]");
    });
});
