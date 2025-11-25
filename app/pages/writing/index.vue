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

        <MainLoadingSpinner v-if="pending" />

        <template v-else>
            <ContentBlogPostsList
                v-if="paginatedPosts && paginatedPosts.length > 0"
                :posts="paginatedPosts"
            />
            <p v-else>Sorry, nothing found.</p>

            <!-- Pagination controls -->
            <ContentPagination
                v-if="totalPages > 1"
                :current-page="currentPage"
                :total-pages="totalPages"
                @go-to-page="goToPage"
            />
        </template>
    </section>
</template>
