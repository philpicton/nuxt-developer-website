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
</script>

<template>
    <header>
        <nav
            class="flex items-center py-3 px-1 flex-wrap max-w-2xl mx-auto"
            role="navigation"
            aria-label="Main navigation"
        >
            <MainColorModeSwitch></MainColorModeSwitch>
            <!-- animated svg hamburger button -->
            <button
                class="text-text-primary dark:text-white inline-flex dark:hover:bg-accent-dark hover:bg-hover-DEFAULT rounded lg:hidden ml-auto stroke-text-primary dark:stroke-white transition-[background-color] focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Main menu"
                @click="open = !open"
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                >
                    <path
                        class="line line1"
                        :class="{ opened: open }"
                        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                    />
                    <path
                        class="line line2"
                        :class="{ opened: open }"
                        d="M 20,50 H 80"
                    />
                    <path
                        class="line line3"
                        :class="{ opened: open }"
                        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                    />
                </svg>
            </button>
            <div
                class="w-full lg:inline-flex lg:flex-grow lg:w-auto lg:max-h-12 overflow-hidden transition-[max-height] duration-500 lg:transition-none lg:opacity-100"
                :class="{
                    'max-h-[300px] opacity-100': open,
                    'max-h-0 opacity-0': !open,
                }"
            >
                <ul
                    class="mt-3 lg:mt-0 lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto"
                >
                    <li v-for="link in links" :key="link.to" class="p-2">
                        <NuxtLink
                            :to="link.to"
                            class="lg:inline-flex lg:w-auto w-full px-3 py-2 text:gray:800 dark:text-gray-200 items-center justify-center hover:bg-hover-DEFAULT dark:hover:bg-gray-800 dark:hover:text-white transition-all rounded router-link-exact-active:bg-hover-DEFAULT dark:router-link-exact-active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
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

<style>
/* hamburger button animation */
.line {
    fill: none;
    stroke-width: 6;
    transition:
        stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
        stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
    stroke-dasharray: 60 207;
    stroke-width: 6;
}
.line2 {
    stroke-dasharray: 60 60;
    stroke-width: 6;
}
.line3 {
    stroke-dasharray: 60 207;
    stroke-width: 6;
}
.line1.opened {
    stroke-dasharray: 90 207;
    stroke-dashoffset: -134;
    stroke-width: 6;
}
.line2.opened {
    stroke-dasharray: 1 60;
    stroke-dashoffset: -30;
    stroke-width: 6;
}
.line3.opened {
    stroke-dasharray: 90 207;
    stroke-dashoffset: -134;
    stroke-width: 6;
}
</style>
