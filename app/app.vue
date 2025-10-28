<script setup lang="ts">
const colorMode = useColorMode();
const themeColorLight = "#e2e8f0"; // slate-300
const themeColorDark = "#0f172a"; // slate-900

useHead({
    link: [
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
        },
        {
            rel: "manifest",
            href: "/site.webmanifest",
        },
    ],
    meta: [
        // Standard theme-color with media queries
        {
            name: "theme-color",
            content: themeColorLight,
            media: "(prefers-color-scheme: light)",
        },
        {
            name: "theme-color",
            content: themeColorDark,
            media: "(prefers-color-scheme: dark)",
        },
        // Apple-specific meta tag for Safari
        {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
        },
        // Dynamic theme-color that updates with user preference
        {
            name: "theme-color",
            content: () =>
                colorMode.value === "dark" ? themeColorDark : themeColorLight,
        },
    ],
});
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage
                :transition="{
                    name: 'page',
                    mode: 'out-in',
                }"
            />
        </NuxtLayout>
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition:
        opacity,
        filter 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
