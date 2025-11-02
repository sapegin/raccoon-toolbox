import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf8');
// @ts-expect-error: Dynamic import of build output
const { render } = (await import('../dist/server/entry-server.js')) as {
  render: (url: string) => string;
};

// Tool IDs from tools.ts
const tools = [
  'base64-encoder',
  'color-converter',
  'html-entity-encoder',
  'json-formatter',
  'regexp-tester',
  'string-case-converter',
  'text-diff',
  'text-stats',
  'unicode-lookup',
  'url-encoder',
  'url-parser',
];

// Prerender the home page (redirects to first tool)
const homeHtml = template.replace('<!--app-html-->', render('/'));
fs.writeFileSync(toAbsolute('dist/index.html'), homeHtml);

// Prerender each tool page
for (const toolId of tools) {
  const url = `/${toolId}`;
  const appHtml = render(url);
  const html = template.replace('<!--app-html-->', appHtml);

  const toolDir = toAbsolute(`dist/${toolId}`);
  fs.mkdirSync(toolDir, { recursive: true });
  fs.writeFileSync(path.join(toolDir, 'index.html'), html);

  console.log(`Generated: ${url}`);
}

console.log('\nPrerendering complete!');
