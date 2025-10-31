import fs from 'node:fs';
import path from 'node:path';
import unicodeNames from '@unicode/unicode-17.0.0/Names/index.js';

type UnicodeCharacter = [number, string];

const characters: UnicodeCharacter[] = [];

// Include only useful blocks for typical use cases (Latin, Cyrillic, emoji,
// symbols, etc.)
const includeBlocks = [
  // Latin
  'Basic_Latin',
  'Latin_1_Supplement',
  'Latin_Extended_A',
  'Latin_Extended_B',
  'Latin_Extended_Additional',
  'Latin_Extended_C',
  'Latin_Extended_D',
  'Latin_Extended_E',
  'Latin_Extended_F',
  'Latin_Extended_G',
  // Cyrillic
  'Cyrillic',
  'Cyrillic_Supplement',
  'Cyrillic_Extended_A',
  'Cyrillic_Extended_B',
  'Cyrillic_Extended_C',
  'Cyrillic_Extended_D',
  // Greek
  'Greek_And_Coptic',
  'Greek_Extended',
  // Common punctuation and symbols
  'General_Punctuation',
  'Superscripts_And_Subscripts',
  'Currency_Symbols',
  'Letterlike_Symbols',
  'Number_Forms',
  'Arrows',
  'Mathematical_Operators',
  'Miscellaneous_Technical',
  'Control_Pictures',
  'Box_Drawing',
  'Block_Elements',
  'Geometric_Shapes',
  'Miscellaneous_Symbols',
  'Dingbats',
  // Emoji and pictographs
  'Emoticons',
  'Miscellaneous_Symbols_And_Pictographs',
  'Supplemental_Symbols_And_Pictographs',
  'Symbols_And_Pictographs_Extended_A',
  'Transport_And_Map_Symbols',
  'Alchemical_Symbols',
  'Geometric_Shapes_Extended',
  'Supplemental_Arrows_A',
  'Supplemental_Arrows_B',
  'Supplemental_Arrows_C',
  'Miscellaneous_Symbols_And_Arrows',
  'Supplemental_Mathematical_Operators',
  'Miscellaneous_Mathematical_Symbols_A',
  'Miscellaneous_Mathematical_Symbols_B',
  'Musical_Symbols',
  'Ancient_Symbols',
  'Tai_Xuan_Jing_Symbols',
  'Counting_Rod_Numerals',
  'Mahjong_Tiles',
  'Domino_Tiles',
  'Playing_Cards',
  'Enclosed_Alphanumeric_Supplement',
  'Enclosed_Alphanumerics',
  'Enclosed_Ideographic_Supplement',
  'Chess_Symbols',
  'Symbols_For_Legacy_Computing',
  'Symbols_For_Legacy_Computing_Supplement',
  // Additional useful blocks
  'IPA_Extensions',
  'Spacing_Modifier_Letters',
  'Combining_Diacritical_Marks',
  'Combining_Diacritical_Marks_Supplement',
  'Combining_Diacritical_Marks_Extended',
  'Phonetic_Extensions',
  'Phonetic_Extensions_Supplement',
  'Modifier_Tone_Letters',
  'Combining_Half_Marks',
  'Braille_Patterns',
  'Yijing_Hexagram_Symbols',
  'Specials',
  'Halfwidth_And_Fullwidth_Forms',
  'Alphabetic_Presentation_Forms',
];

const allowedCodePoints = new Set<number>();

for (const blockName of includeBlocks) {
  try {
    const blockModule = (await import(
      `@unicode/unicode-17.0.0/Block/${blockName}/code-points.js`
    )) as { default: number[] };
    const codePoints = blockModule.default;
    for (const code of codePoints) {
      allowedCodePoints.add(code);
    }
  } catch {
    console.warn(`Warning: Could not load block ${blockName}`);
  }
}

for (const [code, name] of unicodeNames.entries()) {
  const nameStr = name;
  if (allowedCodePoints.has(code) && nameStr !== '<control>') {
    characters.push([code, nameStr]);
  }
}

const output = `// Auto-generated file. Do not edit manually.
// Generated from @unicode/unicode-17.0.0 by scripts/generate-unicode-data.ts

export type UnicodeCharacter = [number, string];

export const unicodeCharacters: UnicodeCharacter[] = ${JSON.stringify(characters, null, 2)};
`;

const outputPath = path.join(process.cwd(), 'src/data/unicode-characters.ts');
const outputDir = path.dirname(outputPath);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, output, 'utf8');

console.log(
  `Generated ${characters.length} Unicode characters to ${outputPath}`
);
