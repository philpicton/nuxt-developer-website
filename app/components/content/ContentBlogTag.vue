<script setup lang="ts">
defineProps({
    text: { type: String, default: "" },
});
</script>

<template>
    <NuxtLink
        :to="`/writing/tag/${text}`"
        class="bg-accent dark:bg-accent-dark rounded-full px-4 py-1 no-underline mr-2 text-sm transition hover:bg-accent-hover dark:hover:bg-accent-dark-hover focus:outline-none focus:ring-2 focus:ring-primary"
        >{{ text }}</NuxtLink
    >
</template>
