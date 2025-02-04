import { defineCollection } from "astro:content";
import { notionPageLoader } from "notion-loader";

const pages = defineCollection({
	loader: () =>
		notionPageLoader({ pageId: "188bfd39e7bc803aa277dd922eb7e504" }),
	schema: notionPageLoader.schema,
});

export const collections = { pages };
