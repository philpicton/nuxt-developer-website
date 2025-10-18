// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import ProjectSlug from "~/pages/projects/[slug].vue";

const mockProject = {
    title: "Virtual Tours Platform",
    description: "An immersive 360° virtual tour platform",
    thumbnail: "/images/projects/virtual-tours-thumb.jpg",
    heroImage: "/images/projects/virtual-tours-hero.jpg",
    tech: ["Vue.js", "Three.js", "Node.js", "MongoDB", "WebGL"],
    date: "2024-01-15",
    path: "/projects/virtual-tours",
    slug: "virtual-tours",
    body: {
        type: "root",
        children: [
            {
                type: "element",
                tag: "h2",
                children: [{ type: "text", value: "Overview" }],
            },
            {
                type: "element",
                tag: "p",
                children: [
                    {
                        type: "text",
                        value: "This is a cutting-edge virtual tours platform.",
                    },
                ],
            },
        ],
    },
};

// Mock the route
const mockRoute = {
    path: "/projects/virtual-tours",
};

mockNuxtImport("useRoute", () => {
    return () => mockRoute;
});

// Mock useAsyncData to return our mock project
mockNuxtImport("useAsyncData", () => {
    return () => ({
        data: ref(mockProject),
        pending: ref(false),
        error: ref(null),
        refresh: () => {},
    });
});

// Mock queryCollection
vi.mock("#content", () => ({
    queryCollection: vi.fn(() => ({
        path: vi.fn(() => ({
            first: vi.fn(() => Promise.resolve(mockProject)),
        })),
    })),
}));

describe("Project Detail Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mountOptions = {
        global: {
            stubs: {
                ContentRenderer: {
                    template:
                        '<div class="content-renderer-stub" data-testid="content-renderer"><slot /></div>',
                },
            },
        },
    };

    it("renders the project title", async () => {
        const wrapper = await mountSuspended(ProjectSlug, mountOptions);

        expect(wrapper.find("h1").text()).toBe("Virtual Tours Platform");
    });

    it("displays project description", async () => {
        const wrapper = await mountSuspended(ProjectSlug, mountOptions);

        expect(wrapper.text()).toContain(
            "An immersive 360° virtual tour platform",
        );
    });

    it("renders technology pills", async () => {
        const wrapper = await mountSuspended(ProjectSlug, mountOptions);

        expect(wrapper.text()).toContain("Vue.js");
        expect(wrapper.text()).toContain("Three.js");
        expect(wrapper.text()).toContain("Node.js");
        expect(wrapper.text()).toContain("MongoDB");
        expect(wrapper.text()).toContain("WebGL");
    });

    it("displays formatted date consistently with blog posts", async () => {
        const wrapper = await mountSuspended(ProjectSlug, mountOptions);

        const dateElement = wrapper.find("small");
        expect(dateElement.exists()).toBe(true);
        expect(dateElement.text()).toBe("Monday, 15 January 2024");
    });

    it("renders hero image and back button", async () => {
        const wrapper = await mountSuspended(ProjectSlug, mountOptions);

        const img = wrapper.findComponent({ name: "NuxtImg" });
        expect(img.exists()).toBe(true);
        expect(img.props("src")).toBe(mockProject.heroImage);
        expect(img.props("alt")).toBe(mockProject.title);

        const backButton = wrapper.findComponent({ name: "BackButton" });
        expect(backButton.exists()).toBe(true);
        expect(backButton.props("to")).toBe("/projects");
    });

    it("renders ContentRenderer within article", async () => {
        const wrapper = await mountSuspended(ProjectSlug, mountOptions);

        expect(wrapper.find("article").exists()).toBe(true);
        const contentRenderer = wrapper.find(
            '[data-testid="content-renderer"]',
        );
        expect(contentRenderer.exists()).toBe(true);
    });
});
