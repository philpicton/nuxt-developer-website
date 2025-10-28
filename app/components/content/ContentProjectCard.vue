<script lang="ts" setup>
import type { ProjectItem } from "~~/types/types";

defineProps<{
    project: ProjectItem;
}>();

const isHovered = ref(false);
</script>

<template>
    <NuxtLink
        :to="project.path"
        class="group block bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md ring-1 ring-slate-200 dark:ring-slate-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <!-- Thumbnail -->
        <div
            class="relative aspect-square overflow-hidden bg-slate-200 dark:bg-slate-700"
        >
            <NuxtImg
                :src="project.thumbnail"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
        </div>

        <!-- Content -->
        <div class="p-4 sm:p-5">
            <!-- Title -->
            <h3
                class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors group-hover:text-green-700 dark:group-hover:text-green-400 line-clamp-2"
            >
                {{ project.title }}
            </h3>

            <!-- Description -->
            <p
                class="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3"
            >
                {{ project.description }}
            </p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all duration-200 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 group-hover:text-green-800 dark:group-hover:text-green-400"
                >
                    {{ tech }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
