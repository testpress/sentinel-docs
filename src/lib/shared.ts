export const appName = 'TPSentinel';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string): string {
  if (!path.startsWith('/') || basePath.length === 0) return path;
  return `${basePath}${path}`;
}

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'testpress',
  repo: 'sentinel-docs',
  branch: 'main',
};
