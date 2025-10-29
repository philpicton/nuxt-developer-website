import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            type: "page",
            source: "pages/*.md",
        }),
        blogPost: defineCollection({
            type: "page",
            source: "writing/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                tags: z.array(z.string()),
                image: z.string(),
                date: z.date(),
            }),
        }),
        project: defineCollection({
            type: "page",
            source: "projects/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                heroImage: z.string().optional(),
                thumbnail: z.string(),
                tech: z.array(z.string()),
                date: z.date(),
            }),
        }),
    },
});
