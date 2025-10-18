// @vitest-environment nuxt
import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import ProjectsIndex from "~/pages/projects/index.vue";

const mockProjects = [
    {
        title: "Project 1",
        description: "Description 1",
        thumbnail: "/images/projects/project1.jpg",
        heroImage: "/images/projects/project1-hero.jpg",
        tech: ["Vue.js", "TypeScript"],
        date: "2024-01-15",
        path: "/projects/project-1",
        slug: "project-1",
    },
    {
        title: "Project 2",
        description: "Description 2",
        thumbnail: "/images/projects/project2.jpg",
        heroImage: "/images/projects/project2-hero.jpg",
        tech: ["React", "Node.js"],
        date: "2024-01-20",
        path: "/projects/project-2",
        slug: "project-2",
    },
    {
        title: "Project 3",
        description: "Description 3",
        thumbnail: "/images/projects/project3.jpg",
        heroImage: "/images/projects/project3-hero.jpg",
        tech: ["Vue.js", "Python"],
        date: "2024-02-01",
        path: "/projects/project-3",
        slug: "project-3",
    },
];

// Mock the route
const mockRoute = {
    query: {},
    path: "/projects",
};

mockNuxtImport("useRoute", () => () => mockRoute);
mockNuxtImport("navigateTo", () => () => {});

// Mock useAsyncData to return our mock projects
mockNuxtImport("useAsyncData", () => {
    return () => ({
        data: ref(mockProjects),
        pending: ref(false),
        error: ref(null),
        refresh: () => {},
    });
});

describe("Projects Index Page", () => {
    beforeEach(() => {
        mockRoute.query = {};
    });

    it("renders page with heading, filter and project cards", async () => {
        const wrapper = await mountSuspended(ProjectsIndex, {
            route: "/projects",
        });

        expect(wrapper.find("h1").text()).toBe("Projects");

        const select = wrapper.find("select#tech-filter");
        expect(select.exists()).toBe(true);
        expect(select.attributes("aria-label")).toContain("Filter");
        expect(wrapper.find("label[for='tech-filter']").text()).toBe(
            "Filter by technology:",
        );

        const cards = wrapper.findAllComponents({ name: "ProjectCard" });
        expect(cards.length).toBe(3);
    });

    it("displays results count and filter options", async () => {
        const wrapper = await mountSuspended(ProjectsIndex, {
            route: "/projects",
        });

        expect(wrapper.text()).toContain("Showing 3 projects");

        const select = wrapper.find("select#tech-filter");
        const options = select.findAll("option");
        expect(options.length).toBeGreaterThan(1);
        expect(options[0].text()).toBe("All technologies");
    });

    it("renders clear filter button and technology tags", async () => {
        const wrapper = await mountSuspended(ProjectsIndex, {
            route: "/projects",
        });

        const clearButton = wrapper.find('button[aria-label*="Clear filter"]');
        expect(clearButton.exists()).toBe(true);

        expect(wrapper.text()).toContain("Vue.js");
        expect(wrapper.text()).toContain("TypeScript");
        expect(wrapper.text()).toContain("React");
    });

    it("passes complete project data to ProjectCard", async () => {
        const wrapper = await mountSuspended(ProjectsIndex, {
            route: "/projects",
        });

        const cards = wrapper.findAllComponents({ name: "ProjectCard" });
        const firstCard = cards[0];
        expect(firstCard.props("project")).toBeDefined();
        expect(firstCard.props("project").heroImage).toBeDefined();
        expect(firstCard.props("project").thumbnail).toBeDefined();
    });
});
