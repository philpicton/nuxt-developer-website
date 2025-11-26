<script lang="ts" setup>
const links = [
    {
        name: "home",
        to: "/",
    },
    {
        name: "about",
        to: "/about",
    },
    {
        name: "writing",
        to: "/writing",
    },
    {
        name: "projects",
        to: "/projects",
    },
    {
        name: "contact",
        to: "/contact",
    },
];
const open = ref(false);
const isMobile = ref(false);

// Detect screen size to manage mobile menu inert attribute.
// To prevent focus on hidden elements when menu is closed.
// Should not be done during SSR, hence inside onMounted.
onMounted(() => {
    const checkIsMobile = () => {
        isMobile.value = window.innerWidth < 1024; // Tailwind's lg breakpoint
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
});

onUnmounted(() => {
    window.removeEventListener("resize", () => {
        isMobile.value = window.innerWidth < 1024;
    });
});
</script>

<template>
    <header>
        <nav
            class="flex items-center py-3 px-1 flex-wrap max-w-2xl mx-auto"
            role="navigation"
            aria-label="Main navigation menu"
            :aria-expanded="(isMobile && open) || !isMobile ? 'true' : 'false'"
        >
            <MainColorModeSwitch></MainColorModeSwitch>
            <MainHamburgerButton v-model="open" class="lg:hidden" />
            <div
                class="w-full lg:inline-flex lg:flex-grow lg:w-auto lg:max-h-12 overflow-hidden transition-[max-height,opacity] duration-500 lg:transition-none lg:opacity-100"
                :class="{
                    'max-h-[300px] opacity-100': open,
                    'max-h-0 opacity-0': !open,
                }"
            >
                <ul
                    :inert="!open && isMobile ? 'true' : undefined"
                    class="mt-3 lg:mt-0 lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto"
                >
                    <li v-for="link in links" :key="link.to" class="p-2">
                        <NuxtLink
                            :to="link.to"
                            class="lg:inline-flex lg:w-auto w-full px-3 py-2 text-text-primary dark:text-text-primary-dark items-center justify-center hover:bg-hover-light dark:hover:bg-hover-dark transition-all rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            exact-active-class="bg-hover-light dark:bg-hover-dark"
                            @click="open = false"
                        >
                            <span>{{ link.name }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
