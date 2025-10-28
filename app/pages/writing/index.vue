<script lang="ts" setup>
useSeoMeta({
    title: "Recent Posts",
    description: "Index of recent blog posts",
});

// Pagination settings
const perPage = 5;
const route = useRoute();
const currentPage = ref(Number(route.query.page) || 1);

const { data: posts, pending } = await useAsyncData("recent-posts", () => {
    return queryCollection("blogPost")
        .order("date", "DESC")
        .select("title", "path", "description", "tags")
        .all();
});

if (!posts.value) {
    showError({
        statusCode: 500,
        message: "Failed to load posts.",
    });
}

// Compute paginated posts
const totalPages = computed(() =>
    Math.ceil((posts.value?.length || 0) / perPage),
);
const paginatedPosts = computed(() =>
    posts.value?.slice(
        (currentPage.value - 1) * perPage,
        currentPage.value * perPage,
    ),
);

// Watch for query param changes
watch(
    () => route.query.page,
    (newPage) => {
        currentPage.value = Number(newPage) || 1;
    },
);

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        navigateTo({ path: "/writing", query: { page: page.toString() } });
    }
}
</script>

<template>
    <section>
        <h1>Recent Posts</h1>
        <hr />

        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"
                role="status"
                aria-label="Loading posts"
            ></div>
        </div>
        <template v-else>
            <ContentBlogPostsList
                v-if="paginatedPosts && paginatedPosts.length > 0"
                :posts="paginatedPosts"
            />
            <p v-else>Sorry, nothing found.</p>

            <!-- Pagination controls -->
            <nav aria-label="Pagination" class="flex justify-center gap-2 mt-6">
                <button
                    :disabled="currentPage === 1"
                    class="w-10 h-10 border rounded disabled:opacity-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 disabled:focus:ring-0 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    :aria-label="`Go to previous page, page ${currentPage - 1}`"
                    @click="goToPage(currentPage - 1)"
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
                        'w-10 h-10 border rounded flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700',
                        page === currentPage ? 'text-green-600' : '',
                    ]"
                    @click="goToPage(page)"
                >
                    {{ page }}
                </button>

                <button
                    :disabled="currentPage === totalPages"
                    class="w-10 h-10 border rounded disabled:opacity-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 disabled:focus:ring-0 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    :aria-label="`Go to next page, page ${currentPage + 1}`"
                    @click="goToPage(currentPage + 1)"
                >
                    <Icon name="formkit:stepforward" size="24" />
                    <span class="sr-only">Next page</span>
                </button>
            </nav>
        </template>
    </section>
</template>
