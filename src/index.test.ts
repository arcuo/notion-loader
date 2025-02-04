import { describe, it, expect } from "bun:test";
import { notionPageListLoader, notionPageLoader } from "./index.ts";
import { NotionPageSchema } from "./schema/page.ts";
import { NotionBlockSchema } from "./schema/block.ts";

describe("notionPageLoader", async () => {
	const [result] = await notionPageLoader({
		pageId: "188bfd39e7bc803aa277dd922eb7e504",
	});

	it("should parse page correctly", () => {
		const parsedPage = NotionPageSchema.safeParse(result.page);
		if (!parsedPage.success) {
			throw new Error(parsedPage.error.toString());
		}
		expect(parsedPage.success).toBe(true);
	});

	it("should parse contents correctly", () => {
		const parsedContent = NotionBlockSchema.array().safeParse(result.contents);
		if (!parsedContent.success) {
			throw new Error(parsedContent.error.toString());
		}
		expect(parsedContent.success).toBe(true);
	});
});

describe("notionPageListLoader", () => {
	it("should parse page list with content correctly", async () => {
		const result = await notionPageListLoader({
			databaseId: "190bfd39e7bc8080964bfe12ff6e56ce",
		});

		for (const page of result) {
			const parsedPage = NotionPageSchema.safeParse(page.page);
			if (!parsedPage.success) {
				throw new Error(parsedPage.error.toString());
			}
			expect(parsedPage.success).toBe(true);
		}
	});
});
