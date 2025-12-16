// Auto-generated file. Do not edit manually.
// Generated from tools.json by scripts/generate-tools.ts

import { ComponentType,lazy } from 'react';

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
    id: 'css-formatter',
    name: 'CSS formatter',
    keywords: ['beautify', 'pretty', 'prettier'],
    component: lazy(() =>
      import('./tools/CssFormatter').then((m) => ({
        default: m.CssFormatter,
      }))
    ),
  },
  {
    id: 'date-converter',
    name: 'Date converter',
    keywords: ['time', 'timestamp', 'unix', 'iso', 'epoch', 'calendar'],
    component: lazy(() =>
      import('./tools/DateConverter').then((m) => ({
        default: m.DateConverter,
      }))
    ),
  },
  {
    id: 'hash-generator',
    name: 'Hash generator',
    keywords: ['md5', 'sha1', 'sha256', 'sha384', 'sha512', 'checksum', 'digest', 'cryptography'],
    component: lazy(() =>
      import('./tools/HashGenerator').then((m) => ({
        default: m.HashGenerator,
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
    id: 'js-formatter',
    name: 'JavaScript formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'typescript', 'ecmascript', 'jsx', 'tsx'],
    component: lazy(() =>
      import('./tools/JsFormatter').then((m) => ({
        default: m.JsFormatter,
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
    id: 'json-csv',
    name: 'JSON ↔ CSV converter',
    keywords: ['spreadsheet', 'table', 'data'],
    component: lazy(() =>
      import('./tools/JsonCsv').then((m) => ({
        default: m.JsonCsv,
      }))
    ),
  },
  {
    id: 'json-yaml',
    name: 'JSON ↔ YAML converter',
    keywords: ['yml', 'data'],
    component: lazy(() =>
      import('./tools/JsonYaml').then((m) => ({
        default: m.JsonYaml,
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
    id: 'line-sort',
    name: 'Line sort/dedupe',
    keywords: ['sorting', 'deduplication', 'duplicates', 'unique', 'lines', 'text', 'order'],
    component: lazy(() =>
      import('./tools/LineSort').then((m) => ({
        default: m.LineSort,
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
    id: 'number-bases',
    name: 'Number base converter',
    keywords: ['numbers', 'binary', 'octal', 'decimal', 'hexadecimal', 'radix', 'base conversion'],
    component: lazy(() =>
      import('./tools/NumberBases').then((m) => ({
        default: m.NumberBases,
      }))
    ),
  },
  {
    id: 'random-string-generator',
    name: 'Random string generator',
    keywords: ['passwords', 'characters', 'generator', 'strings'],
    component: lazy(() =>
      import('./tools/RandomStringGenerator').then((m) => ({
        default: m.RandomStringGenerator,
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
    id: 'text-decoder',
    name: 'Text decoder',
    keywords: ['encoding', 'decoding', 'mojibake', 'cyrillic', 'russian', 'windows-1251', 'koi8-r', 'iso-8859-5', 'ibm866', 'mac-cyrillic'],
    component: lazy(() =>
      import('./tools/TextDecoderTool').then((m) => ({
        default: m.TextDecoderTool,
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
    id: 'uuid-generator',
    name: 'UUID generator',
    keywords: ['guid', 'identifier', 'unique', 'random'],
    component: lazy(() =>
      import('./tools/UuidGenerator').then((m) => ({
        default: m.UuidGenerator,
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
