// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ContentSectionRenderer from "~/components/content/ContentSectionRenderer.vue";

describe("ContentSectionRenderer", () => {
    const validContent = {
        type: "root",
        children: [
            {
                type: "element",
                tag: "h2",
                children: [{ type: "text", value: "Test Heading" }],
            },
            {
                type: "element",
                tag: "p",
                children: [{ type: "text", value: "Test paragraph content." }],
            },
        ],
    };

    const contentWithBody = {
        title: "Test Article",
        body: validContent,
    };

    const contentWithChildren = {
        children: [
            {
                type: "element",
                tag: "p",
                children: [{ type: "text", value: "Direct children content" }],
            },
        ],
    };

    const contentWithType = {
        type: "element",
        tag: "div",
        children: [{ type: "text", value: "Content with type" }],
    };

    describe("Component Structure", () => {
        it("renders an section element", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: validContent },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            expect(wrapper.find("section").exists()).toBe(true);
        });

        it("applies prose code styling classes", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: validContent },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            const section = wrapper.find("section");
            expect(section.classes()).toContain(
                "prose-code:before:content-none",
            );
            expect(section.classes()).toContain(
                "prose-code:after:content-none",
            );
        });

        it("accepts and applies custom class prop", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: validContent, class: "custom-class" },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            const section = wrapper.find("section");
            expect(section.classes()).toContain("custom-class");
        });
    });

    describe("Content Rendering", () => {
        it("renders ContentRenderer with valid content", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: validContent },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template:
                                '<div class="content-stub" data-testid="content-renderer">Content</div>',
                        },
                    },
                },
            });

            expect(
                wrapper.find('[data-testid="content-renderer"]').exists(),
            ).toBe(true);
        });

        it("handles content with body property", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: contentWithBody },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template:
                                '<div class="content-stub" data-testid="content-renderer">Content</div>',
                        },
                    },
                },
            });

            expect(
                wrapper.find('[data-testid="content-renderer"]').exists(),
            ).toBe(true);
        });

        it("handles content with children array", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: contentWithChildren },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template:
                                '<div class="content-stub" data-testid="content-renderer">Content</div>',
                        },
                    },
                },
            });

            expect(
                wrapper.find('[data-testid="content-renderer"]').exists(),
            ).toBe(true);
        });

        it("handles content with type property", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: contentWithType },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template:
                                '<div class="content-stub" data-testid="content-renderer">Content</div>',
                        },
                    },
                },
            });

            expect(
                wrapper.find('[data-testid="content-renderer"]').exists(),
            ).toBe(true);
        });

        it("passes correct value to ContentRenderer", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: contentWithBody },
                global: {
                    stubs: {
                        ContentRenderer: {
                            props: ["value"],
                            template:
                                '<div class="content-stub" data-testid="content-renderer">{{ value.type }}</div>',
                        },
                    },
                },
            });

            expect(wrapper.text()).toContain("root");
        });
    });

    describe("Error Handling", () => {
        it("shows error message when value is null", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: null },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            expect(wrapper.text()).toContain(
                "Sorry. Something went wrong trying to render this content.",
            );
            expect(wrapper.find('[role="alert"]').exists()).toBe(true);
        });

        it("shows error message when value is undefined", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: undefined },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            expect(wrapper.text()).toContain(
                "Sorry. Something went wrong trying to render this content.",
            );
        });

        it("shows error message for invalid content structure", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: { invalid: "structure" } },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            expect(wrapper.text()).toContain(
                "Sorry. Something went wrong trying to render this content.",
            );
        });

        it("hides error details by default", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: null },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            expect(wrapper.text()).toContain(
                "Sorry. Something went wrong trying to render this content.",
            );
            expect(wrapper.text()).not.toContain("No content provided");
        });

        it("shows error details when showErrorDetails is true", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: null, showErrorDetails: true },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            expect(wrapper.text()).toContain(
                "Sorry. Something went wrong trying to render this content.",
            );
            expect(wrapper.text()).toContain("No content provided");
        });

        it("applies error styling classes", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: null },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            const errorDiv = wrapper.find('[role="alert"]');
            expect(errorDiv.classes()).toContain("border-red-300");
            expect(errorDiv.classes()).toContain("dark:border-red-700");
        });
    });

    describe("TypeScript Props", () => {
        it("accepts value prop", async () => {
            const wrapper = await mountSuspended(ContentSectionRenderer, {
                props: { value: validContent },
                global: {
                    stubs: {
                        ContentRenderer: {
                            template: '<div class="content-stub">Content</div>',
                        },
                    },
                },
            });

            expect(wrapper.props("value")).toEqual(validContent);
        });
    });
});
