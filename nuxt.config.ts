// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-10-28",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
        css: {
            devSourcemap: true, // Enable sourcemaps in development
        },
    },
    modules: [
        "@nuxt/content",
        "@nuxthub/core",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxtjs/color-mode",
    ],
    hub: {
        kv: true,
        database: true,
    },
    content: {
        // @ts-expect-error: hub driver is provided by NuxtHub
        driver: "hub",
        build: {
            markdown: {
                highlight: {
                    theme: "github-dark",
                },
            },
        },
    },
    fonts: {
        families: [
            {
                name: "Inter",
                provider: "google",
                weights: [300, 400],
            },
        ],
        defaults: {
            weights: [300, 400],
            styles: ["normal"],
            subsets: ["latin"],
        },
    },
    colorMode: {
        preference: "system", // default value of $colorMode.preference
        fallback: "dark", // fallback value if not system preference found
        globalName: "__NUXT_COLOR_MODE__",
        componentName: "ColorScheme",
        storage: "cookie",
        storageKey: "nuxt-color-mode",
    },
    icon: {
        serverBundle: "local",
    },
    ssr: true, // enable server-side rendering at build time
});
