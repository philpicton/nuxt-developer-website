<template>
    <div class="dark:bg-neutral-bg-dark bg-neutral-bg min-h-[100vh] transition-all">
        <MainSiteHeader></MainSiteHeader>
        <main
            class="prose dark:prose-invert prose-slate max-w-2xl px-3 py-7 mx-auto bg-card-bg sm:px-8 sm:shadow dark:bg-card-bg-dark ring-1 ring-border-light dark:ring-border-dark sm:rounded-lg prose-a:text-primary-hover prose-a:hover:text-primary-dark dark:prose-a:text-primary-light dark:prose-a:hover:text-primary"
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
    @apply bg-slate-200 dark:bg-slate-900 p-1 rounded font-normal;
}
/* and the headings */
.prose h4 > a,
.prose h3 > a,
.prose h2 > a {
    @apply text-slate-800 dark:text-white no-underline;
}
</style>
