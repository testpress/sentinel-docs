import { createOpenAPI } from 'fumadocs-openapi/server';

const openapiUrl = 'https://app.tpsentinel.com/api/openapi.json';

async function fetchOpenAPIDocument() {
  const response = await fetch(openapiUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI schema from ${openapiUrl}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const openapi = createOpenAPI({
  input: {
    sentinel: fetchOpenAPIDocument,
  },
});

export { openapiUrl };
