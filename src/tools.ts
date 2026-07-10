// Auto-generated file. Do not edit manually.
// Generated from tools.json by scripts/generate-tools.ts

import { ComponentType, lazy } from 'react';

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
    component: lazy(async () => {
      const module = await import('./tools/AspectRatioCalculator');
      return { default: module.AspectRatioCalculator };
    }),
  },
  {
    id: 'base64-encoder',
    name: 'Base64 encoder/decoder',
    keywords: ['binary', 'data', 'image'],
    component: lazy(async () => {
      const module = await import('./tools/Base64Encoder');
      return { default: module.Base64Encoder };
    }),
  },
  {
    id: 'coin-toss',
    name: 'Coin toss',
    keywords: ['random', 'flip', 'heads', 'tails', 'chance', 'decision'],
    component: lazy(async () => {
      const module = await import('./tools/CoinToss');
      return { default: module.CoinToss };
    }),
  },
  {
    id: 'color-contrast',
    name: 'Color contrast checker',
    keywords: ['wcag', 'accessibility', 'a11y', 'contrast ratio'],
    component: lazy(async () => {
      const module = await import('./tools/ColorContrast');
      return { default: module.ColorContrast };
    }),
  },
  {
    id: 'color-converter',
    name: 'Color converter',
    keywords: ['hex', 'rgb', 'hsl', 'css', 'palette'],
    component: lazy(async () => {
      const module = await import('./tools/ColorConverter');
      return { default: module.ColorConverter };
    }),
  },
  {
    id: 'css-formatter',
    name: 'CSS formatter',
    keywords: ['beautify', 'pretty', 'prettier'],
    component: lazy(async () => {
      const module = await import('./tools/CssFormatter');
      return { default: module.CssFormatter };
    }),
  },
  {
    id: 'date-converter',
    name: 'Date converter',
    keywords: ['time', 'timestamp', 'unix', 'iso', 'epoch', 'calendar'],
    component: lazy(async () => {
      const module = await import('./tools/DateConverter');
      return { default: module.DateConverter };
    }),
  },
  {
    id: 'hash-generator',
    name: 'Hash generator',
    keywords: ['md5', 'sha1', 'sha256', 'sha384', 'sha512', 'checksum', 'digest', 'cryptography'],
    component: lazy(async () => {
      const module = await import('./tools/HashGenerator');
      return { default: module.HashGenerator };
    }),
  },
  {
    id: 'html-entity-encoder',
    name: 'HTML entity encoder/decoder',
    keywords: ['escape', 'unescape', 'entities', 'special characters'],
    component: lazy(async () => {
      const module = await import('./tools/HtmlEntityEncoder');
      return { default: module.HtmlEntityEncoder };
    }),
  },
  {
    id: 'html-formatter',
    name: 'HTML formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'indent'],
    component: lazy(async () => {
      const module = await import('./tools/HtmlFormatter');
      return { default: module.HtmlFormatter };
    }),
  },
  {
    id: 'js-formatter',
    name: 'JavaScript formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'typescript', 'ecmascript', 'jsx', 'tsx'],
    component: lazy(async () => {
      const module = await import('./tools/JsFormatter');
      return { default: module.JsFormatter };
    }),
  },
  {
    id: 'json-formatter',
    name: 'JSON formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'indent'],
    component: lazy(async () => {
      const module = await import('./tools/JsonFormatter');
      return { default: module.JsonFormatter };
    }),
  },
  {
    id: 'json-csv',
    name: 'JSON ↔ CSV converter',
    keywords: ['spreadsheet', 'table', 'data'],
    component: lazy(async () => {
      const module = await import('./tools/JsonCsv');
      return { default: module.JsonCsv };
    }),
  },
  {
    id: 'json-yaml',
    name: 'JSON ↔ YAML converter',
    keywords: ['yml', 'data'],
    component: lazy(async () => {
      const module = await import('./tools/JsonYaml');
      return { default: module.JsonYaml };
    }),
  },
  {
    id: 'key-codes',
    name: 'Key code lookup',
    keywords: ['keyboard', 'events', 'keycodes', 'keypress'],
    component: lazy(async () => {
      const module = await import('./tools/KeyCodes');
      return { default: module.KeyCodes };
    }),
  },
  {
    id: 'line-sort',
    name: 'Line sort/dedupe',
    keywords: ['sorting', 'deduplication', 'duplicates', 'unique', 'lines', 'text', 'order'],
    component: lazy(async () => {
      const module = await import('./tools/LineSort');
      return { default: module.LineSort };
    }),
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum generator',
    keywords: ['placeholders', 'dummy', 'texts', 'fillers', 'content', 'fish'],
    component: lazy(async () => {
      const module = await import('./tools/LoremIpsum');
      return { default: module.LoremIpsum };
    }),
  },
  {
    id: 'markdown-preview',
    name: 'Markdown preview',
    keywords: ['md', 'markdown', 'markup', 'preview', 'rendering'],
    component: lazy(async () => {
      const module = await import('./tools/MarkdownPreview');
      return { default: module.MarkdownPreview };
    }),
  },
  {
    id: 'number-bases',
    name: 'Number base converter',
    keywords: ['numbers', 'binary', 'octal', 'decimal', 'hexadecimal', 'radix', 'base conversion'],
    component: lazy(async () => {
      const module = await import('./tools/NumberBases');
      return { default: module.NumberBases };
    }),
  },
  {
    id: 'random-string-generator',
    name: 'Random string generator',
    keywords: ['passwords', 'characters', 'generator', 'strings'],
    component: lazy(async () => {
      const module = await import('./tools/RandomStringGenerator');
      return { default: module.RandomStringGenerator };
    }),
  },
  {
    id: 'regexp-tester',
    name: 'RegExp tester',
    keywords: ['regexps', 'regexes', 'regular expressions', 'patterns', 'matches', 'search'],
    component: lazy(async () => {
      const module = await import('./tools/RegExpTester');
      return { default: module.RegExpTester };
    }),
  },
  {
    id: 'string-case-converter',
    name: 'String case converter',
    keywords: ['camelcase', 'snake_case', 'kebab-case', 'pascalcase', 'uppercase', 'lowercase'],
    component: lazy(async () => {
      const module = await import('./tools/StringCaseConverter');
      return { default: module.StringCaseConverter };
    }),
  },
  {
    id: 'text-decoder',
    name: 'Text decoder',
    keywords: ['encoding', 'decoding', 'mojibake', 'cyrillic', 'russian', 'windows-1251', 'koi8-r', 'iso-8859-5', 'ibm866', 'mac-cyrillic'],
    component: lazy(async () => {
      const module = await import('./tools/TextDecoderTool');
      return { default: module.TextDecoderTool };
    }),
  },
  {
    id: 'text-diff',
    name: 'Text diff',
    keywords: ['strings', 'compare', 'difference', 'changes'],
    component: lazy(async () => {
      const module = await import('./tools/TextDiff');
      return { default: module.TextDiff };
    }),
  },
  {
    id: 'text-stats',
    name: 'Text stats',
    keywords: ['strings', 'count', 'words', 'characters', 'lines', 'statistics'],
    component: lazy(async () => {
      const module = await import('./tools/TextStats');
      return { default: module.TextStats };
    }),
  },
  {
    id: 'unicode-lookup',
    name: 'Unicode lookup',
    keywords: ['characters', 'emojis', 'symbols', 'codepoints', 'utf'],
    component: lazy(async () => {
      const module = await import('./tools/UnicodeLookup');
      return { default: module.UnicodeLookup };
    }),
  },
  {
    id: 'url-encoder',
    name: 'URL encoder/decoder',
    keywords: ['escape', 'unescape', 'uri', 'percent'],
    component: lazy(async () => {
      const module = await import('./tools/UrlEncoder');
      return { default: module.UrlEncoder };
    }),
  },
  {
    id: 'url-parser',
    name: 'URL parser',
    keywords: ['uri', 'query string', 'search string', 'params', 'parameters', 'links'],
    component: lazy(async () => {
      const module = await import('./tools/UrlParser');
      return { default: module.UrlParser };
    }),
  },
  {
    id: 'uuid-generator',
    name: 'UUID generator',
    keywords: ['guid', 'identifier', 'unique', 'random'],
    component: lazy(async () => {
      const module = await import('./tools/UuidGenerator');
      return { default: module.UuidGenerator };
    }),
  },
  {
    id: 'xml-formatter',
    name: 'XML formatter',
    keywords: ['beautify', 'pretty', 'prettier', 'indent', 'svg'],
    component: lazy(async () => {
      const module = await import('./tools/XmlFormatter');
      return { default: module.XmlFormatter };
    }),
  },
  {
    id: 'extras',
    name: 'More tools',
    keywords: ['external', 'extras', 'links', 'resources'],
    component: lazy(async () => {
      const module = await import('./tools/Extras');
      return { default: module.Extras };
    }),
  },
];
