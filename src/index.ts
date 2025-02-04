import { Client } from "@notionhq/client";

const notion = new Client({ auth: import.meta.env.NOTION_API_TOKEN });

export async function notionLoader(opts: { pageId: string }) {
	const [page, contents] = await Promise.all([
		notion.pages.retrieve({ page_id: opts.pageId }),
		notion.blocks.children.list({
			block_id: opts.pageId,
		}),
	]);


    console.log(page);
    console.log(contents);
}
