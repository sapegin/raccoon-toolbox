// Auto-generated file. Do not edit manually.
// Generated from tools.json by scripts/generate-tools.ts

import { lazy, ComponentType } from 'react';

export interface Tool {
  id: string;
  name: string;
  component: ComponentType;
}

export const tools: Tool[] = [
  {
    id: 'base64-encoder',
    name: 'Base64 encoder/decoder',
    component: lazy(() =>
      import('./tools/Base64Encoder').then((m) => ({
        default: m.Base64Encoder,
      }))
    ),
  },
  {
    id: 'color-converter',
    name: 'Color converter',
    component: lazy(() =>
      import('./tools/ColorConverter').then((m) => ({
        default: m.ColorConverter,
      }))
    ),
  },
  {
    id: 'html-entity-encoder',
    name: 'HTML entity encoder/decoder',
    component: lazy(() =>
      import('./tools/HtmlEntityEncoder').then((m) => ({
        default: m.HtmlEntityEncoder,
      }))
    ),
  },
  {
    id: 'html-formatter',
    name: 'HTML formatter',
    component: lazy(() =>
      import('./tools/HtmlFormatter').then((m) => ({
        default: m.HtmlFormatter,
      }))
    ),
  },
  {
    id: 'json-formatter',
    name: 'JSON formatter',
    component: lazy(() =>
      import('./tools/JsonFormatter').then((m) => ({
        default: m.JsonFormatter,
      }))
    ),
  },
  {
    id: 'key-codes',
    name: 'Key code lookup',
    component: lazy(() =>
      import('./tools/KeyCodes').then((m) => ({
        default: m.KeyCodes,
      }))
    ),
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum generator',
    component: lazy(() =>
      import('./tools/LoremIpsum').then((m) => ({
        default: m.LoremIpsum,
      }))
    ),
  },
  {
    id: 'regexp-tester',
    name: 'RegExp tester',
    component: lazy(() =>
      import('./tools/RegExpTester').then((m) => ({
        default: m.RegExpTester,
      }))
    ),
  },
  {
    id: 'string-case-converter',
    name: 'String case converter',
    component: lazy(() =>
      import('./tools/StringCaseConverter').then((m) => ({
        default: m.StringCaseConverter,
      }))
    ),
  },
  {
    id: 'text-diff',
    name: 'Text diff',
    component: lazy(() =>
      import('./tools/TextDiff').then((m) => ({
        default: m.TextDiff,
      }))
    ),
  },
  {
    id: 'text-stats',
    name: 'Text stats',
    component: lazy(() =>
      import('./tools/TextStats').then((m) => ({
        default: m.TextStats,
      }))
    ),
  },
  {
    id: 'unicode-lookup',
    name: 'Unicode lookup',
    component: lazy(() =>
      import('./tools/UnicodeLookup').then((m) => ({
        default: m.UnicodeLookup,
      }))
    ),
  },
  {
    id: 'url-encoder',
    name: 'URL encoder/decoder',
    component: lazy(() =>
      import('./tools/UrlEncoder').then((m) => ({
        default: m.UrlEncoder,
      }))
    ),
  },
  {
    id: 'url-parser',
    name: 'URL parser',
    component: lazy(() =>
      import('./tools/UrlParser').then((m) => ({
        default: m.UrlParser,
      }))
    ),
  },
  {
    id: 'xml-formatter',
    name: 'XML formatter',
    component: lazy(() =>
      import('./tools/XmlFormatter').then((m) => ({
        default: m.XmlFormatter,
      }))
    ),
  },
];
