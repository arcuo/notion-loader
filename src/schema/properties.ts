import { z } from "astro/zod";
import { NotionEmojiSchema, NotionTextSchema } from "./text";
import { NotionUserSchema } from "./object";
import {
	NotionExternalFileObjectSchema,
	NotionFileSchema,
	NotionInternalFileObjectSchema,
} from "./file";
import { NotionColorSchema } from "./color";

const NotionFormulaSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("number"),
		number: z.number(),
	}),
	z.object({
		type: z.literal("string"),
		string: z.string(),
	}),
	z.object({
		type: z.literal("boolean"),
		boolean: z.boolean(),
	}),
	z.object({
		type: z.literal("date"),
		date: z.string().datetime(),
	}),
]);

const NotionPagePropertiesTypesScheme = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("checkbox"),
		checkbox: z.boolean(),
	}),
	z.object({
		type: z.literal("created_by"),
		created_by: NotionUserSchema,
	}),
	z.object({
		type: z.literal("created_time"),
		created_time: z.string().datetime(),
	}),
	z.object({
		type: z.literal("date"),
		start: z.string().datetime(),
		end: z.string().datetime(),
		time_zone: z.string(),
	}),
	z.object({
		type: z.literal("email"),
		email: z.string(),
	}),
	z.object({
		type: z.literal("files"),
		files: z.array(NotionFileSchema).optional().nullable(),
	}),
	z.object({
		type: z.literal("formula"),
		formula: NotionFormulaSchema,
	}),
	z.object({
		type: z.literal("icon"),
		icon: z.discriminatedUnion("type", [
			NotionInternalFileObjectSchema,
			NotionExternalFileObjectSchema,
			NotionEmojiSchema,
		]),
	}),
	z.object({
		type: z.literal("last_edited_by"),
		last_edited_by: NotionUserSchema,
	}),
	z.object({
		type: z.literal("last_edited_time"),
		last_edited_time: z.string().datetime(),
	}),
	z.object({
		type: z.literal("multi_select"),
		multi_select: z.array(
			z.object({
				color: NotionColorSchema,
				name: z.string(),
				id: z.string(),
			}),
		),
	}),
	z.object({
		type: z.literal("number"),
		number: z.number(),
	}),
	z.object({
		type: z.literal("people"),
		people: z.array(NotionUserSchema),
	}),
	z.object({
		type: z.literal("phone_number"),
		phone_number: z.string(),
	}),
	z.object({
		type: z.literal("relation"),
		has_more: z.boolean(),
		relation: z.array(
			z.object({
				id: z.string().describe("Page reference ID"),
			}),
		),
	}),
	z.object({
		type: z.literal("rollup"),
		rollup: z.any(),
	}),
	z.object({
		type: z.literal("rich_text"),
		rich_text: z.array(NotionTextSchema),
	}),
	z.object({
		type: z.literal("select"),
		select: z.object({
			id: z.string(),
			name: z.string(),
			color: NotionColorSchema,
		}),
	}),
	z.object({
		type: z.literal("status"),
		status: z.object({
			color: NotionColorSchema,
			id: z.string(),
			name: z.string(),
		}),
	}),
	z.object({
		type: z.literal("title"),
		title: z.array(NotionTextSchema).optional().nullable(),
	}),
	z.object({
		type: z.literal("url"),
		url: z.string().url(),
	}),
	z.object({
		type: z.literal("unique_id"),
		unique_id: z.object({
			number: z.number(),
			prefix: z.string().nullable(),
		}),
	}),
]);

export const NotionPagePropertiesSchema = z.record(z.string(), NotionPagePropertiesTypesScheme);
