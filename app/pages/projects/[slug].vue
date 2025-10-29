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
                <p
                    class="text-xl text-text-secondary dark:text-text-muted mb-4"
                >
                    {{ project.description }}
                </p>

                <div class="flex flex-wrap gap-2 mb-4 not-prose">
                    <span
                        v-for="tech in project.tech"
                        :key="tech"
                        class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/30 text-primary-dark dark:text-primary-light ring-1 ring-primary/20 dark:ring-primary/70"
                    >
                        {{ tech }}
                    </span>
                </div>

                <ClientOnly>
                    <time
                        :datetime="project.date"
                        class="text-sm text-text-tertiary dark:text-text-tertiary"
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
                    <template #fallback>
                        <time
                            :datetime="project.date"
                            class="text-sm text-text-tertiary dark:text-text-tertiary"
                        >
                            {{ new Date(project.date).toLocaleDateString() }}
                        </time>
                    </template>
                </ClientOnly>
            </header>

            <figure
                v-if="project.heroImage || project.thumbnail"
                class="not-prose mb-8 rounded-lg overflow-hidden shadow-lg ring-1 ring-border-light dark:ring-border-dark group p-0.5"
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
