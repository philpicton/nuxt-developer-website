import type {
    BlogPostCollectionItem,
    ProjectCollectionItem,
} from "@nuxt/content";

export interface Article {
    title: string;
    _path: string;
    description: string;
    tags?: string[];
}
export interface BlogPostItem extends BlogPostCollectionItem {
    title: string;
    description: string;
    tags: string[];
    image: string;
    date: string;
}

export type BlogPostList = {
    title: string;
    description: string;
    tags: string[];
    path: string;
}[];

export interface ProjectItem extends ProjectCollectionItem {
    title: string;
    description: string;
    thumbnail: string;
    heroImage?: string;
    tech: string[];
    date: string;
    path: string;
    slug: string;
}

export type ProjectList = ProjectItem[];

export interface MailApiResponse {
    success: boolean;
    error?: string;
}

export type ContactForm = {
    name: string;
    email: string;
    phone: string;
    message: string;
    website: string; // honeypot
};

export type ContactFormValidation = {
    name: boolean;
    email: boolean;
    phone: boolean;
};
