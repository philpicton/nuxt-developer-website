// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import MainLoadingSpinner from "~/components/main/MainLoadingSpinner.vue";

describe("MainLoadingSpinner", () => {
    it("renders the loading spinner", async () => {
        const wrapper = await mountSuspended(MainLoadingSpinner);

        expect(wrapper.find('[role="status"]').exists()).toBe(true);
        expect(wrapper.find('[aria-label="Loading content"]').exists()).toBe(
            true,
        );
    });
});
