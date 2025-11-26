<script lang="ts" setup>
import type { ProjectItem } from "~~/types/types";

useSeoMeta({
    title: "Projects",
    description: "Portfolio of projects",
});

// Pagination settings
const perPage = 8;
const route = useRoute();
const currentPage = ref(Number(route.query.page) || 1);

// Search/filter state
const searchTech = ref<string>((route.query.tech as string) || "");

// Fetch all projects
const { data: allProjects, pending } = await useAsyncData(
    "all-projects",
    () => {
        return queryCollection("project")
            .order("date", "DESC")
            .select(
                "title",
                "path",
                "description",
                "tech",
                "thumbnail",
                "heroImage",
                "date",
            )
            .all();
    },
);

if (!allProjects.value) {
    showError({
        statusCode: 500,
        message: "Failed to load projects.",
    });
}

// Get tech for filter dropdown
const allTechnologies = computed(() => {
    const techs = new Set<string>();
    allProjects.value?.forEach((project) => {
        project.tech?.forEach((t: string) => techs.add(t));
    });
    return Array.from(techs).sort();
});

// Filter projects by selected tech
const filteredProjects = computed(() => {
    if (!searchTech.value) return allProjects.value || [];
    return (
        allProjects.value?.filter((project) =>
            project.tech?.some(
                (t: string) =>
                    t.toLowerCase() === searchTech.value.toLowerCase(),
            ),
        ) || []
    );
});

// Compute paginated projects
const totalPages = computed(() =>
    Math.ceil((filteredProjects.value?.length || 0) / perPage),
);
const paginatedProjects = computed(() =>
    filteredProjects.value?.slice(
        (currentPage.value - 1) * perPage,
        currentPage.value * perPage,
    ),
);

// Watch for query param changes
watch(
    () => route.query,
    (newQuery) => {
        currentPage.value = Number(newQuery.page) || 1;
        searchTech.value = (newQuery.tech as string) || "";
    },
);

// Watch search tech changes and reset to page 1
watch(searchTech, () => {
    goToPage(1);
});

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        const query: Record<string, string> = { page: page.toString() };
        if (searchTech.value) {
            query.tech = searchTech.value;
        }
        navigateTo({ path: "/projects", query });
    }
}

function clearFilter() {
    searchTech.value = "";
    navigateTo({ path: "/projects" });
}
</script>

<template>
    <article>
        <header class="mb-6">
            <h1>Projects</h1>
            <p class="text-text-secondary dark:text-text-muted">
                A selection of my projects<br />
            </p>
        </header>
        <hr />

        <!-- Search/Filter Section -->
        <form
            role="search"
            class="my-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
        >
            <label for="tech-filter" class="text-sm font-medium flex-shrink-0">
                Filter by technology:
            </label>
            <div class="flex gap-2 flex-1 w-full sm:w-auto">
                <select
                    id="tech-filter"
                    v-model="searchTech"
                    class="flex-1 px-3 py-2 rounded border border-border-mid dark:border-accent-dark-hover bg-card-bg dark:bg-accent-dark text-text-primary dark:text-white transition-colors focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none h-10"
                    aria-label="Filter projects by technology"
                >
                    <option value="">All technologies</option>
                    <option
                        v-for="tech in allTechnologies"
                        :key="tech"
                        :value="tech"
                    >
                        {{ tech }}
                    </option>
                </select>
                <button
                    class="w-10 h-10 rounded border border-border-mid dark:border-accent-dark-hover bg-hover-light dark:bg-accent-dark transition-all disabled:opacity-0 disabled:cursor-default flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
                    :disabled="!searchTech"
                    :class="
                        searchTech
                            ? 'hover:bg-accent hover:dark:bg-accent-dark-hover'
                            : 'pointer-events-none'
                    "
                    :aria-label="
                        searchTech
                            ? `Clear filter: ${searchTech}`
                            : 'Clear filter'
                    "
                    @click="clearFilter"
                >
                    <Icon name="formkit:close" size="20" />
                </button>
            </div>
        </form>

        <!-- Results count -->
        <p class="text-sm text-text-secondary dark:text-text-tertiary mb-4">
            <template v-if="filteredProjects.length > perPage">
                Showing {{ perPage }} projects of {{ filteredProjects.length }}
            </template>
            <template v-else>
                Showing {{ filteredProjects.length }}
                {{ filteredProjects.length === 1 ? "project" : "projects" }}
            </template>
            <span v-if="searchTech" class="font-medium">
                with {{ searchTech }}
            </span>
        </p>

        <!-- Loading state -->
        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin h-8 w-8 border-4 border-loading border-t-transparent rounded-full"
                role="status"
                aria-label="Loading projects"
            ></div>
        </div>

        <!-- Projects Grid -->
        <section v-else>
            <TransitionGroup
                v-if="paginatedProjects && paginatedProjects.length > 0"
                name="project-list"
                tag="div"
                class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 not-prose"
            >
                <ContentProjectCard
                    v-for="project in paginatedProjects"
                    :key="project.path"
                    :project="project as ProjectItem"
                />
            </TransitionGroup>
            <p
                v-else
                class="text-center py-8 text-text-secondary dark:text-text-tertiary"
            >
                No projects found. Try adjusting your filter.
            </p>

            <!-- Pagination controls -->
            <ContentPagination
                v-if="totalPages > 1"
                :current-page="currentPage"
                :total-pages="totalPages"
                @go-to-page="goToPage"
            />
        </section>
    </article>
</template>

<style scoped>
/* Transition animations for project cards */
.project-list-move,
.project-list-enter-active,
.project-list-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-list-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.project-list-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.project-list-leave-active {
    position: absolute;
    max-width: 292px;
    width: calc(50% - 12px); /* Match grid gap */
}

/* On mobile, leaving cards should take full width */
@media (max-width: 640px) {
    .project-list-leave-active {
        width: 100%;
    }
}
</style>
