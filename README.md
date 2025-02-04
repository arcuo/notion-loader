# notion-loader

Astro content loader for Notion.

## Usage

Add to the `src/content.config.ts` file:

```ts
import { defineCollection } from "astro:content";
import { notionDatabasePagesLoader } from "notion-loader";

const pages = defineCollection({
	loader: () =>
		notionDatabasePagesLoader({ databaseId: "database-id" }),
	schema: notionDatabasePagesLoader.schema,
});

export const collections = { pages };
```

## TODOs

-   [x] Add support for querying a page by ID
-   [x] Add support for querying pages from a database by ID
-   [ ] Add functions to grab relevant data from a page
-   [ ] Add components to render relevant data from a page
-   [ ] Add functions to grab relevant data from a block
-   [ ] Add components to render relevant data from a block

## Development

To install dependencies

```bash
bun install
```

Run tests

```bash
bun test
```
