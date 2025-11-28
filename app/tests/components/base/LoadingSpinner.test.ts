// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import BaseLoadingSpinner from "~/components/base/BaseLoadingSpinner.vue";

describe("BaseLoadingSpinner", () => {
    it("renders the loading spinner", async () => {
        const wrapper = await mountSuspended(BaseLoadingSpinner);

        expect(wrapper.find('[role="status"]').exists()).toBe(true);
        expect(wrapper.find('[aria-label="Loading content"]').exists()).toBe(
            true,
        );
    });
});
