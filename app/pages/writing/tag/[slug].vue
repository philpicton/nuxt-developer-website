<script setup lang="ts">
const route = useRoute();
const tag = route.params.slug as string;

useSeoMeta({
    title: `Posts Tagged With '${tag}'`,
    description: "See the index of posts with that tag.",
});

const { data: posts, pending } = await useAsyncData(`tag-${tag}`, () => {
    return queryCollection("blogPost")
        .where("tags", "LIKE", `%${tag}%`)
        .order("date", "DESC")
        .select("title", "path", "description", "tags")
        .all();
});

if (!posts.value || posts.value.length === 0) {
    showError({
        statusCode: 404,
        message: `No posts found with tag "${tag}".`,
    });
}
</script>

<template>
    <div>
        <h1 class="mb-4 text-3xl font-bold">Posts tagged with "{{ tag }}"</h1>
        <hr />
        <BaseLoadingSpinner v-if="pending" />
        <ContentBlogPostsList
            v-else-if="posts && posts.length > 0"
            :posts="posts"
        />
        <hr />
        <ContentBackButton to="/writing"></ContentBackButton>
    </div>
</template>
