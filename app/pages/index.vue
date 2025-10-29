<script setup lang="ts">
const { data: home, pending } = await useAsyncData("home", () =>
    queryCollection("pages").path("/pages/home").first(),
);

if (!home.value) {
    showError({
        statusCode: 404,
        message:
            "Failed to load page content. Please check your content/home.md file.",
    });
}

useSeoMeta({
    title: home.value?.title,
    description: home.value?.description,
});
</script>

<template>
    <div>
        <div class="flex justify-center items-center py-12 mb-8">
            <h1
                class="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-light to-cyan-400 text-center"
            >
                Hello World
            </h1>
        </div>
        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin h-8 w-8 border-4 border-loading border-t-transparent rounded-full"
                role="status"
                aria-label="Loading content"
            ></div>
        </div>
        <ContentSectionRenderer v-else-if="home" :value="home" />
    </div>
</template>
