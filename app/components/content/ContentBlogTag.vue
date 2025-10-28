<script setup lang="ts">
defineProps({
    text: { type: String, default: "" },
});
</script>

<template>
    <NuxtLink
        :to="`/writing/tag/${text}`"
        class="bg-slate-300 dark:bg-slate-700 rounded-full px-4 py-1 no-underline mr-2 text-sm transition hover:bg-slate-400 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >{{ text }}</NuxtLink
    >
</template>
