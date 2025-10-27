<script setup lang="ts">
const { data: about, pending } = await useAsyncData(() =>
    queryCollection("pages").path("/pages/about").first(),
);

if (!about.value) {
    showError({
        statusCode: 404,
        message: "About page content not found.",
    });
}

useSeoMeta({
    title: about.value?.title,
    description: about.value?.description,
});
</script>

<template>
    <div>
        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"
                role="status"
                aria-label="Loading content"
            ></div>
        </div>
        <ContentRenderer v-else-if="about" :value="about" />
    </div>
</template>
