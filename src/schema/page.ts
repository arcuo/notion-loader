import { z } from "astro/zod";
import { NotionFileSchema } from "./file";
import { NotionObjectSchema } from "./object";
import { NotionEmojiSchema } from "./text";
import { NotionPagePropertiesSchema } from "./properties";

export const NotionPageSchema = NotionObjectSchema.extend({
	object: z.literal("page"),
	cover: NotionFileSchema.nullable(),
	icon: z.union([NotionFileSchema, NotionEmojiSchema]).nullable(),
	properties: NotionPagePropertiesSchema,
});

export type NotionPage = z.infer<typeof NotionPageSchema>;
