import { lazy, ComponentType } from 'react';

export interface Tool {
  id: string;
  name: string;
  component: ComponentType;
}

// This list should be in sync with the on in lib.rs
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
    id: 'json-formatter',
    name: 'JSON formatter',
    component: lazy(() =>
      import('./tools/JsonFormatter').then((m) => ({
        default: m.JsonFormatter,
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
];
