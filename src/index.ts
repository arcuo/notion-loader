import { Client } from "@notionhq/client";
import { NotionPageSchema, type NotionPage } from "./schema/page";
import { NotionBlockSchema, type NotionBlock } from "./schema/block";
import { z } from "astro/zod";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: import.meta.env.NOTION_API_TOKEN });

/** Query a Notion page by ID. Returns the page and its contents. */
async function notionPageLoader(opts: { pageId: string }) {
	const [page, contents] = await Promise.all([
		notion.pages.retrieve({ page_id: opts.pageId }),
		notion.blocks.children.list({
			block_id: opts.pageId,
		}),
	]);

	return [{ id: opts.pageId, page, contents: contents.results }];
}

type NotionPageWithContent = { page: NotionPage; contents: NotionBlock[] };
type Return<T> = T extends true ? NotionPageWithContent : NotionPage;

/** Query a Notion database by ID. Returns the pages and their contents. */
async function notionDatabasePagesLoader(opts: {
	databaseId: string;
	query?: Omit<QueryDatabaseParameters, "database_id">;
}) {
	const result = await notion.databases.query({
		database_id: opts.databaseId,
		...opts.query,
	});

	const pageIds = result.results.map((page) => page.id);
	const contents = await Promise.all(
		pageIds.map((id) =>
			notion.blocks.children.list({
				block_id: id,
			}),
		),
	);

	return result.results.map((page, index) => ({
		page,
		contents: contents[index].results,
	}));
}

notionPageLoader.schema = z.object({
	page: NotionPageSchema,
	contents: NotionBlockSchema.array(),
});

export { notionPageLoader, notionDatabasePagesLoader as notionPageListLoader };
