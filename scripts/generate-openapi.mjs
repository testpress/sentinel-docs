import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

const openapiUrl = 'https://app.tpsentinel.com/api/openapi.json';
const outputDir = './content/docs/api-reference';

const openapi = createOpenAPI({
  input: {
    sentinel: async () => {
      const response = await fetch(openapiUrl, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch OpenAPI schema from ${openapiUrl}: ${response.status} ${response.statusText}`);
      }

      return response.json();
    },
  },
});

await generateFiles({
  input: openapi,
  output: outputDir,
  per: 'operation',
  includeDescription: true,
  index: {
    url: (file) => `/docs/api-reference/${file.replace(/\.mdx$/, '')}`,
    items: [
      {
        path: 'index.mdx',
        description: 'All available API endpoints',
      },
    ],
  },
});
