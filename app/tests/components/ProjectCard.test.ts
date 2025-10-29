// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ContentProjectCard from "~/components/content/ContentProjectCard.vue";
import type { ProjectItem } from "~~/types/types";

describe("ContentProjectCard", () => {
    const mockProject = {
        title: "Test Project",
        description: "A test project description that is quite detailed",
        thumbnail: "/images/projects/test-thumb.jpg",
        heroImage: "/images/projects/test-hero.jpg",
        tech: ["Vue.js", "TypeScript", "Tailwind CSS"],
        date: "2024-01-15",
        path: "/projects/test-project",
        slug: "test-project",
    } as ProjectItem;

    it("renders project card with title and description", async () => {
        const wrapper = await mountSuspended(ContentProjectCard, {
            props: { project: mockProject },
        });

        expect(wrapper.find("h3").text()).toBe("Test Project");
        expect(wrapper.text()).toContain("A test project description");
    });

    it("renders thumbnail image and links to project", async () => {
        const wrapper = await mountSuspended(ContentProjectCard, {
            props: { project: mockProject },
        });

        const img = wrapper.findComponent({ name: "NuxtImg" });
        expect(img.exists()).toBe(true);
        expect(img.props("src")).toBe(mockProject.thumbnail);
        expect(img.props("alt")).toBe(mockProject.title);

        const link = wrapper.findComponent({ name: "NuxtLink" });
        expect(link.props("to")).toBe("/projects/test-project");
    });

    it("renders all technology pills", async () => {
        const wrapper = await mountSuspended(ContentProjectCard, {
            props: { project: mockProject },
        });

        const techPills = wrapper.findAll("span");
        const techText = techPills.map((pill) => pill.text());

        expect(techText).toContain("Vue.js");
        expect(techText).toContain("TypeScript");
        expect(techText).toContain("Tailwind CSS");
    });

    it("handles projects with many technologies", async () => {
        const projectWithManyTech = {
            ...mockProject,
            tech: [
                "Vue.js",
                "TypeScript",
                "Tailwind",
                "Node.js",
                "PostgreSQL",
                "Docker",
            ],
        } as ProjectItem;

        const wrapper = await mountSuspended(ContentProjectCard, {
            props: { project: projectWithManyTech },
        });

        const techPills = wrapper.findAll("span");
        expect(techPills.length).toBeGreaterThanOrEqual(6);
    });

    it("handles projects with no technologies", async () => {
        const projectWithNoTech = {
            ...mockProject,
            tech: [],
        } as ProjectItem;

        const wrapper = await mountSuspended(ContentProjectCard, {
            props: { project: projectWithNoTech },
        });

        expect(wrapper.text()).toContain("Test Project");
        expect(wrapper.findAll("span")).toHaveLength(0);
    });

    it("truncates long descriptions with line-clamp", async () => {
        const projectWithLongDesc = {
            ...mockProject,
            description:
                "This is a very long description that should be truncated by the line-clamp-3 utility class. It goes on and on with lots of text that would take up too much space on the card if it were all shown.",
        } as ProjectItem;

        const wrapper = await mountSuspended(ContentProjectCard, {
            props: { project: projectWithLongDesc },
        });

        const description = wrapper.find("p");
        expect(description.classes()).toContain("line-clamp-3");
    });
});
