<template>
    <div
        class="dark:bg-neutral-bg-dark bg-neutral-bg min-h-screen transition-all duration-300"
    >
        <MainSiteHeader></MainSiteHeader>
        <main
            class="prose prose-a:transition prose-a:duration-500 prose-a:ease-in-out dark:prose-invert prose-slate max-w-2xl px-3 py-7 mx-auto bg-card-bg sm:px-8 sm:shadow dark:bg-card-bg-dark transition duration-300 ring-1 ring-border-light dark:ring-border-dark sm:rounded-lg prose-a:text-primary prose-a:hover:text-primary-hover dark:prose-a:text-primary-dark dark:prose-a:hover:text-primary-dark-hover"
        >
            <slot />
        </main>
        <MainSiteFooter></MainSiteFooter>
    </div>
</template>

<style>
@reference '../assets/css/main.css';

/* override tailwind's styles for inline code */
.prose :where(code):not(:where(pre *)) {
    @apply bg-neutral-bg dark:bg-neutral-bg-dark p-1 rounded font-normal;
}
/* and the headings */
.prose h4 > a,
.prose h3 > a,
.prose h2 > a {
    @apply text-text-primary dark:text-text-primary-dark no-underline;
}
</style>
