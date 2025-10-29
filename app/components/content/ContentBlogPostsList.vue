<script lang="ts" setup>
import type { BlogPostList } from "~~/types/types";

defineProps<{
    posts: BlogPostList;
}>();
</script>

<template>
    <div>
        <ul class="list-none pl-0" aria-label="Blog posts">
            <li v-for="{ title, path, description, tags } in posts" :key="path">
                <NuxtLink :to="path">
                    {{ title }}
                </NuxtLink>
                <br />
                <small>{{ description }}</small>
                <br />
                <ContentBlogTag v-for="tag in tags" :key="tag" :text="tag" />
                <br />
            </li>
        </ul>
    </div>
</template>
