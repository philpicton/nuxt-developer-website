<script lang="ts" setup>
defineProps<{
    currentPage: number;
    totalPages: number;
}>();
defineEmits<{
    (e: "goToPage", page: number): void;
}>();
</script>
<template>
    <nav
        v-if="totalPages > 1"
        aria-label="Pagination"
        class="flex justify-center gap-2 mt-6"
    >
        <button
            :disabled="currentPage === 1"
            class="w-10 h-10 border-2 border-border-light dark:border-border-dark rounded disabled:opacity-30 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary disabled:focus:ring-0 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            :aria-label="`Go to previous page, page ${currentPage - 1}`"
            @click="$emit('goToPage', currentPage - 1)"
        >
            <Icon name="formkit:stepback" size="24" class="block" />
            <span class="sr-only">Previous page</span>
        </button>
        <button
            v-for="page in totalPages"
            :key="page"
            :aria-current="page === currentPage ? 'page' : undefined"
            :aria-label="`${page === currentPage ? 'Current page' : 'Go to'} page ${page}`"
            :class="[
                'w-10 h-10 border-2 border-border-light dark:border-border-dark rounded flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-700',
                page === currentPage
                    ? 'text-accent border-accent! dark:text-primary! dark:border-primary! font-bold'
                    : '',
            ]"
            @click="$emit('goToPage', page)"
        >
            {{ page }}
        </button>

        <button
            :disabled="currentPage === totalPages"
            class="w-10 h-10 border-2 border-border-light dark:border-border-dark rounded disabled:opacity-30 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary disabled:focus:ring-0 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            :aria-label="`Go to next page, page ${currentPage + 1}`"
            @click="$emit('goToPage', currentPage + 1)"
        >
            <Icon name="formkit:stepforward" size="24" />
            <span class="sr-only">Next page</span>
        </button>
    </nav>
</template>
