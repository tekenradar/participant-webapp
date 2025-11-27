import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(2).join("/"),
    locale: data.slug.split("/")[0],
});

const infoPages = defineCollection({
    name: 'InfoPage',
    pattern: '*/informatie/**/*.mdx',
    schema: s
        .object({
            title: s.string().max(99),
            slug: s.path(),
            cover: s.image().optional(),
            coverCredits: s.string().optional(),
            coverImageYPosition: s.string().optional(),
            content: s.mdx(),
            layout: s.string().optional(),

            previousPageURL: s.string().optional(),
            previousPageTitle: s.string().optional(),
            previousPageDescription: s.string().optional(),

            nextPageURL: s.string().optional(),
            nextPageTitle: s.string().optional(),
            nextPageDescription: s.string().optional(),

            overviewPageKey: s.string().optional(),
        }).transform(computedFields),
});

const onderzoekPages = defineCollection({
    name: 'OnderzoekPage',
    pattern: '*/onderzoek/**/*.mdx',
    schema: s
        .object({
            title: s.string().max(99),
            slug: s.path(),
            cover: s.image().optional(),
            coverCredits: s.string().optional(),
            coverImageYPosition: s.string().optional(),
            content: s.mdx(),
            layout: s.string().optional(),

            previousPageURL: s.string().optional(),
            previousPageTitle: s.string().optional(),
            previousPageDescription: s.string().optional(),

            nextPageURL: s.string().optional(),
            nextPageTitle: s.string().optional(),
            nextPageDescription: s.string().optional(),
        }).transform(computedFields),
});

const generalPages = defineCollection({
    name: 'GeneralPage',
    pattern: '*/general/**/*.mdx',
    schema: s
        .object({
            title: s.string().max(99),
            slug: s.path(),
            cover: s.image().optional(),
            coverCredits: s.string().optional(),
            coverImageYPosition: s.string().optional(),
            content: s.mdx(),
        }).transform(computedFields),
});

const newsPages = defineCollection({
    name: 'NewsItem',
    pattern: '*/nieuws/**/*.mdx',
    schema: s
        .object({
            title: s.string().max(99), // Zod primitive type
            slug: s.path(),
            date: s.isodate(),
            cover: s.image().optional(),
            coverCredits: s.string().optional(),
            coverImageYPosition: s.string().optional(),
            content: s.mdx(),
            teaserText: s.string().optional(),
        }).transform(computedFields),
});


export default defineConfig({
    root: 'content',
    output: {
        data: ".velite",
        assets: "public/static/content-assets",
        base: "/static/content-assets/",
        name: "[name]-[hash:6].[ext]",
        clean: true,
    },
    mdx: {
        remarkPlugins: [],
        rehypePlugins: [
            rehypeSlug,
        ],
    },
    collections: {
        infoPages,
        generalPages,
        newsPages,
        onderzoekPages,
    },
})