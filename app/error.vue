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
            <MainGlitchText>
                <h1
                    class="text-4xl md:text-6xl font-bold text-error dark:text-red-400 mb-4"
                >
                    Error {{ error?.statusCode }}
                </h1>
            </MainGlitchText>
            <p
                class="text-lg text-text-secondary dark:text-text-muted mb-8 text-center max-w-md"
            >
                {{ error?.message || "An unexpected error occurred." }}
            </p>
            <NuxtLink to="/"> Go Back Home </NuxtLink>
        </main>
    </NuxtLayout>
</template>
