// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import BlogTag from "~/components/content/BlogTag.vue";

describe("BlogTag", () => {
    it("renders NuxtLink with tag text", async () => {
        const wrapper = await mountSuspended(BlogTag, {
            props: { text: "vue" },
        });

        expect(wrapper.findComponent({ name: "NuxtLink" }).exists()).toBe(true);
        expect(wrapper.text()).toBe("vue");
    });

    it("generates correct URL path from text prop", async () => {
        const wrapper = await mountSuspended(BlogTag, {
            props: { text: "javascript" },
        });

        const link = wrapper.findComponent({ name: "NuxtLink" });
        expect(link.props("to")).toBe("/writing/tag/javascript");
    });

    it("updates URL when text prop changes", async () => {
        const wrapper = await mountSuspended(BlogTag, {
            props: { text: "before" },
        });

        expect(wrapper.text()).toBe("before");

        await wrapper.setProps({ text: "after" });
        expect(wrapper.text()).toBe("after");
        expect(wrapper.findComponent({ name: "NuxtLink" }).props("to")).toBe(
            "/writing/tag/after",
        );
    });
});
