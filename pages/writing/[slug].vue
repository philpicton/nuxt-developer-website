<script setup>
const route = useRoute();
const { data: post, pending } = await useAsyncData(route.path, () => {
    return queryCollection("blogPost").path(route.path).first();
});

if (!post.value) {
    showError({
        statusCode: 404,
        message: "Blog post not found.",
    });
}

useSeoMeta({
    title: `${post?.value?.title || "Post"}`,
    description: `${post?.value?.description || "Read this blog post."}`,
});
</script>

<template>
    <div>
        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"
                role="status"
                aria-label="Loading post"
            ></div>
        </div>
        <article
            v-else-if="post"
            class="prose-code:before:content-none prose-code:after:content-none"
        >
            <ContentBlogTag v-for="tag in post.tags" :key="tag" :text="tag"></ContentBlogTag>
            <div>
                <h2>{{ post.title }}</h2>
                <ClientOnly>
                    <time :datetime="post.date" class="text-sm">
                        {{
                            new Date(post.date).toLocaleDateString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                        }}
                    </time>
                    <template #fallback>
                        <time :datetime="post.date" class="text-sm">
                            {{ new Date(post.date).toLocaleDateString() }}
                        </time>
                    </template>
                </ClientOnly>
            </div>
            <hr />
            <ContentSectionRenderer :value="post.body" />
        </article>
        <hr />
        <ContentBackButton to="/writing"></ContentBackButton>
    </div>
</template>
