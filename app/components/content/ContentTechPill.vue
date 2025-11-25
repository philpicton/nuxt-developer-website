<script setup lang="ts">
defineProps({
    text: { type: String, default: "" },
});
</script>

<template>
    <span
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-hover-mid dark:bg-accent-dark transition-all duration-200 group-hover:bg-primary/10 dark:group-hover:bg-primary/30 group-hover:text-primary-dark dark:group-hover:text-primary-light"
    >
        {{ text }}
    </span>
</template>
