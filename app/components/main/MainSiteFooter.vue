<script lang="ts" setup>
const date = new Date().getFullYear();
</script>

<template>
    <footer class="max-w-2xl mx-auto">
        <small class="text-text-primary dark:text-text-primary-dark">
            © {{ date }} [Your Name]
        </small>
    </footer>
</template>
