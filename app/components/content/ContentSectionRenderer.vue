<script setup lang="ts">
/**
 * ContentSectionRenderer - A wrapper component for Nuxt Content's ContentRenderer
 * that provides consistent styling and error handling for article content.
 *
 * This component wraps content in an <section> tag with prose styling,
 * removes Tailwind Typography's default backtick pseudo-elements from inline code,
 * and provides graceful error handling.
 */

interface Props {
    /**
     * The parsed content object from Nuxt Content
     * Must contain a body property with the rendered content tree
     */
    value: object;
    /**
     * Optional additional CSS classes to apply to the article element
     */
    class?: string;
    /**
     * Whether to show detailed error messages (useful for debugging)
     * @default false
     */
    showErrorDetails?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
    showErrorDetails: false,
});

// Validate that value prop exists and has required structure
const isValidContent = computed(() => {
    if (!props.value) return false;

    const val = props.value as Record<string, unknown>;
    // Content from Nuxt Content can be:
    // 1. An object with a body property (full content object)
    // 2. A body object itself with type property (rendered content tree)
    // 3. A parsed AST with children array
    if (val.body) return true;
    if (val.type) return true;
    if (val.children && Array.isArray(val.children)) return true;

    return false;
});

const errorMessage = computed(() => {
    if (!props.value) {
        return "No content provided";
    }
    if (!isValidContent.value) {
        return "Invalid content structure";
    }
    return null;
});

// Get the actual content to render
const contentValue = computed(() => {
    if (!isValidContent.value) return null;
    const val = props.value as Record<string, unknown>;
    // If value has a body property, use it; otherwise assume value is the body
    return val.body || props.value;
});
</script>

<template>
    <section
        :class="[
            'prose-code:before:content-none prose-code:after:content-none',
            props.class,
        ]"
    >
        <!-- Error state -->
        <div
            v-if="!isValidContent"
            class="p-4 rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
            role="alert"
        >
            <p class="font-semibold text-red-800 dark:text-red-400">
                Sorry. Something went wrong trying to render this content.
            </p>
            <p
                v-if="showErrorDetails"
                class="text-sm text-red-700 dark:text-red-300 mt-1"
            >
                {{ errorMessage }}
            </p>
        </div>

        <!-- Content -->
        <ContentRenderer v-else-if="contentValue" :value="contentValue" />
    </section>
</template>

<style scoped>
@reference '../../assets/css/main.css';

/* Override Tailwind Typography's styles for inline code */
article :deep(code:not(pre *)) {
    @apply bg-slate-200 dark:bg-slate-900 p-1 rounded font-normal;
}

/* Style headings with links */
article :deep(h4 > a),
article :deep(h3 > a),
article :deep(h2 > a) {
    @apply text-slate-800 dark:text-white no-underline;
}
</style>
