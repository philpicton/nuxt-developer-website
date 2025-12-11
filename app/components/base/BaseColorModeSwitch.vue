<script setup lang="ts">
const colorMode = useColorMode();

const onClick = () => {
    colorMode.preference = colorMode.value === "light" ? "dark" : "light";
};

const ariaLabel = computed(() =>
    colorMode.value === "dark" ? "Switch to light mode" : "Switch to dark mode",
);
</script>

<template>
    <button
        :aria-label="ariaLabel"
        class="w-5 h-5 hover:text-primary transition flex flex-col justify-center focus:outline-none focus:ring-2 focus:ring-primary rounded"
        @click="onClick"
    >
        <ColorScheme placeholder="...">
            <Icon
                v-if="colorMode.value === 'light'"
                name="ph:moon-bold"
                class="w-5 h-5 dark:text-white dark:hover:text-primary-dark-hover"
            />
            <Icon
                v-else
                name="ph:sun-bold"
                class="w-5 h-5 dark:text-white dark:hover:text-primary-dark-hover"
            />
        </ColorScheme>
    </button>
</template>
