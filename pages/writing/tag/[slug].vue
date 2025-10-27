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
        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"
                role="status"
                aria-label="Loading posts"
            ></div>
        </div>
        <ul v-else-if="posts && posts.length > 0">
            <li
                v-for="post in posts"
                :key="post.path"
                class="mb-6 border-b pb-4 last:border-0"
            >
                <NuxtLink
                    :to="post.path"
                    class="text-2xl font-semibold text-green-600 hover:underline"
                    >{{ post.title }}</NuxtLink
                >
                <p class="mt-2 text-gray-700">{{ post.description }}</p>
                <div class="mt-2">
                    <ContentBlogTag
                        v-for="t in post.tags"
                        :key="t"
                        :text="t"
                        class="mr-2"
                    />
                </div>
            </li>
        </ul>
        <hr />
        <ContentBackButton to="/writing"></ContentBackButton>
    </div>
</template>
