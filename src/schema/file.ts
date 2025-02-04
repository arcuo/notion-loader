import { z } from "astro/zod";
import { NotionTextSchema } from "./text";

const NotionFileBaseSchema = z.object({
	caption: z.array(NotionTextSchema).optional().nullable(),
});

export const NotionInternalFileObjectSchema = NotionFileBaseSchema.extend({
	type: z.literal("file"),
	file: z.object({
		url: z.string().url(),
		expiry_time: z.string(),
	}),
});

export const NotionExternalFileObjectSchema = NotionFileBaseSchema.extend({
	type: z.literal("external"),
	external: z.object({
		url: z.string().url(),
	}),
});

export const NotionFileSchema = z.discriminatedUnion("type", [
	NotionInternalFileObjectSchema,
	NotionExternalFileObjectSchema,
]);
