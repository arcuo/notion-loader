import { z } from "astro/zod";

export const NotionUserSchema = z.object({
	object: z.literal("user"),
	id: z.string(),
});

export const NotionColorSchemaBase = z.enum([
	"default",
	"gray",
	"brown",
	"orange",
	"yellow",
	"green",
	"blue",
	"purple",
	"pink",
	"red",
]);

export const NotionColorSchema = NotionColorSchemaBase.and(
	z.enum([
		"default_background",
		"gray_background",
		"brown_background",
		"orange_background",
		"yellow_background",
		"green_background",
		"blue_background",
		"purple_background",
		"pink_background",
		"red_background",
	]),
);

export const NotionEmojiSchema = z.object({
	type: z.literal("emoji"),
	emoji: z.string(),
});

export const NotionBasicTextSchema = z.object({
	type: z.literal("text"),
	text: z
		.object({
			content: z.string(),
			link: z.object({ url: z.string() }).nullable(),
		})
		.optional(),
	annotations: z.object({
		bold: z.boolean(),
		italic: z.boolean(),
		strikethrough: z.boolean(),
		underline: z.boolean(),
		code: z.boolean(),
		color: NotionColorSchema,
	}),
	plain_text: z.string(),
	href: z.string().nullable(),
});

export const NotionMentionTextSchema = z.object({
	type: z.literal("mention"),
	mention: z.object({
		type: z.enum(["user", "page", "database", "date", "file", "mention"]),
	}),
});

export const NotionEquationTextSchema = z.object({
	type: z.literal("equation"),
	equation: z.object({
		expression: z.string(),
	}),
});

export const NotionTextSchema = z.discriminatedUnion("type", [
	NotionBasicTextSchema,
	NotionMentionTextSchema,
	NotionEquationTextSchema,
]);
