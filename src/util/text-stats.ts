export interface TextStats {
  characters: number;
  charactersWithoutWhitespace: number;
  lines: number;
  words: number;
  paragraphs: number;
  sentences: number;
  readingTimeMinutes: number;
}

// TODO: Add tests

// Average reading speed for adults: ~200-250 WPM
// Source: https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786
const AVERAGE_READING_SPEED_WPM = 200;

export function calculateTextStats(text: string): TextStats {
  // Characters
  const characters = text.length;
  const charactersWithoutWhitespace = text.replaceAll(/\s/g, '').length;

  // Lines
  const lines = text === '' ? 0 : text.split('\n').length;

  // Words: split by whitespace
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  // Paragraphs: split by blank lines (two or more newlines)
  const paragraphs =
    text.trim() === ''
      ? 0
      : text
          .trim()
          .split(/\n\s*\n/)
          .filter((p) => p.trim() !== '').length;

  // Sentences: approximate by counting . ! ? followed by space or end of string
  const sentenceMatches = text.match(/[.!?](?:\s|$)/g);
  const sentences = sentenceMatches ? sentenceMatches.length : 0;

  // Reading time: based on average reading speed
  const readingTimeMinutes = Math.ceil(words / AVERAGE_READING_SPEED_WPM);

  return {
    characters,
    charactersWithoutWhitespace,
    lines,
    words,
    paragraphs,
    sentences,
    readingTimeMinutes,
  };
}
