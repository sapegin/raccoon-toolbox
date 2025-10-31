// TODO: Add tests

export type CaseType =
  | 'lower'
  | 'upper'
  | 'sentence'
  | 'title'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'screaming-snake'
  | 'kebab'
  | 'cobol'
  | 'train'
  | 'spongebob';

export const caseOptions: { value: CaseType; label: string }[] = [
  { value: 'lower', label: 'lower case' },
  { value: 'upper', label: 'UPPER CASE' },
  { value: 'sentence', label: 'Sentence case' },
  { value: 'title', label: 'Title Case' },
  { value: 'camel', label: 'camelCase' },
  { value: 'pascal', label: 'PascalCase' },
  { value: 'snake', label: 'snake_case' },
  { value: 'screaming-snake', label: 'SCREAMING_SNAKE_CASE' },
  { value: 'kebab', label: 'kebab-case' },
  { value: 'cobol', label: 'COBOL-CASE' },
  { value: 'train', label: 'Train-Case' },
  { value: 'spongebob', label: 'SponGebOB CaSE' },
];

function splitWords(text: string): string[] {
  return text
    .replaceAll(/([a-z])([A-Z])/g, '$1 $2')
    .replaceAll(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replaceAll(/[_-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

function toTitleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function convertCaseSingle(text: string, caseType: CaseType): string {
  if (text === '') {
    return '';
  }

  switch (caseType) {
    case 'lower':
      return text.toLowerCase();

    case 'upper':
      return text.toUpperCase();

    case 'sentence': {
      const trimmed = text.trim();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    }

    case 'title': {
      const words = splitWords(text);
      return words.map(toTitleCase).join(' ');
    }

    case 'camel': {
      const words = splitWords(text);
      return words
        .map((word, index) =>
          index === 0 ? word.toLowerCase() : toTitleCase(word)
        )
        .join('');
    }

    case 'pascal': {
      const words = splitWords(text);
      return words.map(toTitleCase).join('');
    }

    case 'snake': {
      const words = splitWords(text);
      return words.map((word) => word.toLowerCase()).join('_');
    }

    case 'screaming-snake': {
      const words = splitWords(text);
      return words.map((word) => word.toUpperCase()).join('_');
    }

    case 'kebab': {
      const words = splitWords(text);
      return words.map((word) => word.toLowerCase()).join('-');
    }

    case 'cobol': {
      const words = splitWords(text);
      return words.map((word) => word.toUpperCase()).join('-');
    }

    case 'train': {
      const words = splitWords(text);
      return words.map(toTitleCase).join('-');
    }

    // Inspired by https://dev.to/caseconverter/building-a-true-spongebob-case-converter-fk7
    case 'spongebob': {
      let result = '';
      let consecutiveCount = 0;
      let lastWasUpper = false;

      for (const char of text) {
        if (/[a-zA-Z]/.test(char)) {
          const shouldBeUpper: boolean =
            consecutiveCount >= 2
              ? lastWasUpper === false
              : Math.random() < 0.5;

          result += shouldBeUpper ? char.toUpperCase() : char.toLowerCase();

          if (shouldBeUpper === lastWasUpper) {
            consecutiveCount++;
          } else {
            consecutiveCount = 1;
            lastWasUpper = shouldBeUpper;
          }
        } else {
          result += char;
        }
      }
      return result;
    }

    default:
      return text;
  }
}

export function convertCase(text: string, caseType: CaseType): string {
  if (text === '') {
    return '';
  }

  // Convert each line individually
  const lines = text.split('\n');
  return lines.map((line) => convertCaseSingle(line, caseType)).join('\n');
}
