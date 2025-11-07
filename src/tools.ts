// Auto-generated file. Do not edit manually.
// Generated from tools.json by scripts/generate-tools.ts

import { lazy, ComponentType } from 'react';

export interface Tool {
  id: string;
  name: string;
  keywords: string[];
  component: ComponentType;
}

export const tools: Tool[] = [
  {
    id: 'aspect-ratio',
    name: 'Aspect ratio calculator',
    keywords: ['dimensions', 'width', 'height', 'videos', 'images'],
    component: lazy(() =>
      import('./tools/AspectRatioCalculator').then((m) => ({
        default: m.AspectRatioCalculator,
      }))
    ),
  },
  {
    id: 'base64-encoder',
    name: 'Base64 encoder/decoder',
    keywords: ['binary', 'data', 'image'],
    component: lazy(() =>
      import('./tools/Base64Encoder').then((m) => ({
        default: m.Base64Encoder,
      }))
    ),
  },
  {
    id: 'color-converter',
    name: 'Color converter',
    keywords: ['hex', 'rgb', 'hsl', 'css', 'palette'],
    component: lazy(() =>
      import('./tools/ColorConverter').then((m) => ({
        default: m.ColorConverter,
      }))
    ),
  },
  {
    id: 'color-contrast',
    name: 'Color contrast checker',
    keywords: ['wcag', 'accessibility', 'a11y', 'contrast ratio'],
    component: lazy(() =>
      import('./tools/ColorContrast').then((m) => ({
        default: m.ColorContrast,
      }))
    ),
  },
  {
    id: 'html-entity-encoder',
    name: 'HTML entity encoder/decoder',
    keywords: ['escape', 'unescape', 'entities', 'special characters'],
    component: lazy(() =>
      import('./tools/HtmlEntityEncoder').then((m) => ({
        default: m.HtmlEntityEncoder,
      }))
    ),
  },
  {
    id: 'html-formatter',
    name: 'HTML formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'indent'],
    component: lazy(() =>
      import('./tools/HtmlFormatter').then((m) => ({
        default: m.HtmlFormatter,
      }))
    ),
  },
  {
    id: 'json-formatter',
    name: 'JSON formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'indent'],
    component: lazy(() =>
      import('./tools/JsonFormatter').then((m) => ({
        default: m.JsonFormatter,
      }))
    ),
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV converter',
    keywords: ['convert', 'export', 'spreadsheet', 'table', 'data'],
    component: lazy(() =>
      import('./tools/JsonToCsv').then((m) => ({
        default: m.JsonToCsv,
      }))
    ),
  },
  {
    id: 'key-codes',
    name: 'Key code lookup',
    keywords: ['keyboard', 'events', 'keycodes', 'keypress'],
    component: lazy(() =>
      import('./tools/KeyCodes').then((m) => ({
        default: m.KeyCodes,
      }))
    ),
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum generator',
    keywords: ['placeholders', 'dummy', 'texts', 'fillers', 'content', 'fish'],
    component: lazy(() =>
      import('./tools/LoremIpsum').then((m) => ({
        default: m.LoremIpsum,
      }))
    ),
  },
  {
    id: 'regexp-tester',
    name: 'RegExp tester',
    keywords: ['regexps', 'regexes', 'regular expressions', 'patterns', 'matches', 'search'],
    component: lazy(() =>
      import('./tools/RegExpTester').then((m) => ({
        default: m.RegExpTester,
      }))
    ),
  },
  {
    id: 'string-case-converter',
    name: 'String case converter',
    keywords: ['camelcase', 'snake_case', 'kebab-case', 'pascalcase', 'uppercase', 'lowercase'],
    component: lazy(() =>
      import('./tools/StringCaseConverter').then((m) => ({
        default: m.StringCaseConverter,
      }))
    ),
  },
  {
    id: 'text-diff',
    name: 'Text diff',
    keywords: ['strings', 'compare', 'difference', 'changes'],
    component: lazy(() =>
      import('./tools/TextDiff').then((m) => ({
        default: m.TextDiff,
      }))
    ),
  },
  {
    id: 'text-stats',
    name: 'Text stats',
    keywords: ['strings', 'count', 'words', 'characters', 'lines', 'statistics'],
    component: lazy(() =>
      import('./tools/TextStats').then((m) => ({
        default: m.TextStats,
      }))
    ),
  },
  {
    id: 'unicode-lookup',
    name: 'Unicode lookup',
    keywords: ['characters', 'emojis', 'symbols', 'codepoints', 'utf'],
    component: lazy(() =>
      import('./tools/UnicodeLookup').then((m) => ({
        default: m.UnicodeLookup,
      }))
    ),
  },
  {
    id: 'url-encoder',
    name: 'URL encoder/decoder',
    keywords: ['escape', 'unescape', 'uri', 'percent'],
    component: lazy(() =>
      import('./tools/UrlEncoder').then((m) => ({
        default: m.UrlEncoder,
      }))
    ),
  },
  {
    id: 'url-parser',
    name: 'URL parser',
    keywords: ['uri', 'query string', 'search string', 'params', 'parameters', 'links'],
    component: lazy(() =>
      import('./tools/UrlParser').then((m) => ({
        default: m.UrlParser,
      }))
    ),
  },
  {
    id: 'xml-formatter',
    name: 'XML formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'indent', 'svg'],
    component: lazy(() =>
      import('./tools/XmlFormatter').then((m) => ({
        default: m.XmlFormatter,
      }))
    ),
  },
  {
    id: 'extras',
    name: 'More tools',
    keywords: ['external', 'extras', 'links', 'resources'],
    component: lazy(() =>
      import('./tools/Extras').then((m) => ({
        default: m.Extras,
      }))
    ),
  },
];
