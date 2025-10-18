<script setup lang="ts">
interface ErrorProps {
    error?: {
        statusCode?: number;
        message?: string;
    };
}

defineProps<ErrorProps>();

useSeoMeta({
    title: "Error - Something went wrong",
    description: "An error occurred while loading the page.",
});
</script>

<template>
    <NuxtLayout>
        <main class="flex flex-col items-center justify-center min-h-[60vh]">
            <GlitchText>
                <h1
                    class="text-4xl md:text-6xl font-bold text-red-600 dark:text-red-400 mb-4"
                >
                    Error {{ error?.statusCode }}
                </h1>
            </GlitchText>
            <p
                class="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-md"
            >
                {{ error?.message || "An unexpected error occurred." }}
            </p>
            <NuxtLink to="/"> Go Back Home </NuxtLink>
        </main>
    </NuxtLayout>
</template>
