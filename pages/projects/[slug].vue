<script setup lang="ts">
const route = useRoute();
const { data: project, pending } = await useAsyncData(route.path, () => {
    return queryCollection("project").path(route.path).first();
});

if (!project.value) {
    showError({
        statusCode: 404,
        message: "Project not found.",
    });
}

useSeoMeta({
    title: `${project?.value?.title || "Project"}`,
    description: `${project?.value?.description || "View this project."}`,
});
</script>

<template>
    <div>
        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"
                role="status"
                aria-label="Loading project"
            ></div>
        </div>
        <article v-else-if="project">
            <header class="mb-8">
                <h1 class="mb-3">{{ project.title }}</h1>
                <p class="text-xl text-slate-600 dark:text-slate-300 mb-4">
                    {{ project.description }}
                </p>

                <div class="flex flex-wrap gap-2 mb-4 not-prose">
                    <span
                        v-for="tech in project.tech"
                        :key="tech"
                        class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-700"
                    >
                        {{ tech }}
                    </span>
                </div>

                <time
                    :datetime="project.date"
                    class="text-sm text-slate-500 dark:text-slate-400"
                >
                    {{
                        new Date(project.date).toLocaleDateString("en-GB", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }}
                </time>
            </header>

            <figure
                v-if="project.heroImage || project.thumbnail"
                class="not-prose mb-8 rounded-lg overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 group p-0.5"
            >
                <NuxtImg
                    :src="project.heroImage || project.thumbnail"
                    :alt="project.title"
                    class="w-full h-auto mx-auto rounded-lg"
                    loading="lazy"
                />
            </figure>

            <hr />

            <ContentSectionRenderer :value="project.body" class="my-8" />

            <footer class="mt-8 not-prose">
                <hr class="mb-8" />
                <nav aria-label="Project navigation">
                    <ContentBackButton to="/projects"
                        >Back to Projects</ContentBackButton
                    >
                </nav>
            </footer>
        </article>
    </div>
</template>
