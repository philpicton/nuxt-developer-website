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
        <MainLoadingSpinner v-if="pending" />
        <article v-else-if="about">
            <ContentSectionRenderer :value="about" />
        </article>
    </div>
</template>
