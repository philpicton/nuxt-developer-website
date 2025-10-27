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
        class="w-5 h-5 hover:text-green-600 transition flex flex-col justify-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
        @click="onClick"
    >
        <ColorScheme placeholder="...">
            <Icon
                v-if="colorMode.value === 'dark'"
                name="ph:moon-bold"
                class="w-5 h-5 dark:text-white dark:hover:text-green-500"
            />
            <Icon
                v-else
                name="ph:sun-bold"
                class="w-5 h-5 dark:text-white dark:hover:text-green-500"
            />
        </ColorScheme>
    </button>
</template>
