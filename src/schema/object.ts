import { z } from "astro/zod";

export const NotionUserSchema = z.object({
	object: z.literal("user"),
	id: z.string(),
});

export const NotionParentSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("database_id"),
		database_id: z.string(),
	}),
	z.object({
		type: z.literal("page_id"),
		page_id: z.string(),
	}),
	z.object({
		type: z.literal("workspace"),
		workspace: z.boolean(),
	}),
	z.object({
		type: z.literal("block_id"),
		block_id: z.string(),
	}),
]);

export const NotionObjectSchema = z.object({
	id: z.string(),
	created_time: z.string(),
	last_edited_time: z.string(),
	created_by: NotionUserSchema,
	last_edited_by: NotionUserSchema,
	archived: z.boolean().optional(),
	url: z.string().url().nullable().optional(),
	public_url: z.string().url().nullable().optional(),
	parent: NotionParentSchema,
});
