<script lang="ts" setup>
const date = new Date().getFullYear();
</script>

<template>
    <footer class="max-w-2xl mx-auto">
        <small class="text-gray-900 dark:text-white">
            © {{ date }} [Your Name] • Built with Nuxt 3
        </small>
    </footer>
</template>
