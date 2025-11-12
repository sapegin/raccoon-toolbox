import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { Stack } from '../../styled-system/jsx/stack';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const VOWELS = 'aeiouy';
const CONSONANTS = 'bcdfghjklmnpqrstvwxz';

function getRandomInt(max: number): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

function getRandomChars(chars: string, count: number): string {
  return Array.from({ length: count }, () =>
    chars.charAt(getRandomInt(chars.length))
  ).join('');
}

function generateRandomWord(
  syllablesCount = 3,
  minSyllableLength = 2,
  maxSyllableLength = 3
): string {
  let word = '';

  for (let i = 0; i < syllablesCount; i++) {
    const syllableLength =
      getRandomInt(maxSyllableLength - minSyllableLength + 1) +
      minSyllableLength;

    for (let j = 0; j < syllableLength; j++) {
      const useVowel = j % 2 === 1;
      word += getRandomChars(useVowel ? VOWELS : CONSONANTS, 1);
    }
  }

  return word;
}

function getRandomWords(count: number): string[] {
  return Array.from({ length: count }, () => generateRandomWord());
}

function generateRandomString(
  uppercase: number,
  lowercase: number,
  symbols: number,
  digits: number,
  words: number,
  separator: string,
  groupSize: number
): string {
  let result = '';

  result += getRandomChars(UPPERCASE, uppercase);
  result += getRandomChars(LOWERCASE, lowercase);
  result += getRandomChars(SYMBOLS, symbols);
  result += getRandomChars(DIGITS, digits);

  const chars = result.split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  result = chars.join('');

  if (words > 0) {
    const wordArray = getRandomWords(words);
    result = result
      ? `${result}${separator}${wordArray.join(separator)}`
      : wordArray.join(separator);
  }

  if (groupSize > 0 && separator && result) {
    const parts: string[] = [];
    for (let i = 0; i < result.length; i += groupSize) {
      parts.push(result.slice(i, i + groupSize));
    }
    result = parts.join(separator);
  }

  return result;
}

export function RandomStringGenerator() {
  const [uppercase, setUppercase] = usePersistentState(
    'randomStringGenerator.uppercase',
    '4'
  );
  const [lowercase, setLowercase] = usePersistentState(
    'randomStringGenerator.lowercase',
    '4'
  );
  const [symbols, setSymbols] = usePersistentState(
    'randomStringGenerator.symbols',
    '2'
  );
  const [digits, setDigits] = usePersistentState(
    'randomStringGenerator.digits',
    '4'
  );
  const [words, setWords] = usePersistentState(
    'randomStringGenerator.words',
    '0'
  );
  const [separator, setSeparator] = usePersistentState(
    'randomStringGenerator.separator',
    '-'
  );
  const [groupSize, setGroupSize] = usePersistentState(
    'randomStringGenerator.groupSize',
    '0'
  );
  const [count, setCount] = usePersistentState(
    'randomStringGenerator.count',
    '1'
  );
  const [output, setOutput] = useState('');

  const generateStrings = useCallback(() => {
    const numCount = Number.parseInt(count, 10);
    const numUppercase = Number.parseInt(uppercase, 10) || 0;
    const numLowercase = Number.parseInt(lowercase, 10) || 0;
    const numSymbols = Number.parseInt(symbols, 10) || 0;
    const numDigits = Number.parseInt(digits, 10) || 0;
    const numWords = Number.parseInt(words, 10) || 0;
    const numGroupSize = Number.parseInt(groupSize, 10) || 0;

    if (Number.isNaN(numCount) || numCount < 1) {
      setOutput('');
      return;
    }

    const strings = Array.from({ length: numCount }, () =>
      generateRandomString(
        numUppercase,
        numLowercase,
        numSymbols,
        numDigits,
        numWords,
        separator,
        numGroupSize
      )
    );

    setOutput(strings.join('\n'));
  }, [
    count,
    uppercase,
    lowercase,
    symbols,
    digits,
    words,
    separator,
    groupSize,
  ]);

  useEffect(() => {
    generateStrings();
  }, [generateStrings]);

  const handleNumberChange =
    (setter: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === '' || /^\d+$/.test(value)) {
        setter(value);
      }
    };

  return (
    <Screen gridTemplateColumns="17rem 1fr">
      <Panel fullHeight accessibleLabel="Configuration">
        <Stack gap="m">
          <Input
            id="uppercase"
            label="Uppercase characters"
            type="number"
            value={uppercase}
            onChange={handleNumberChange(setUppercase)}
          />
          <Input
            id="lowercase"
            label="Lowercase characters"
            type="number"
            value={lowercase}
            onChange={handleNumberChange(setLowercase)}
          />
          <Input
            id="symbols"
            label="Symbols"
            type="number"
            value={symbols}
            onChange={handleNumberChange(setSymbols)}
          />
          <Input
            id="digits"
            label="Digits"
            type="number"
            value={digits}
            onChange={handleNumberChange(setDigits)}
          />
          <Input
            id="words"
            label="Words"
            type="number"
            value={words}
            onChange={handleNumberChange(setWords)}
          />
          <Input
            id="separator"
            label="Separator"
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          />
          <Input
            id="groupSize"
            label="Group size (0 — no grouping)"
            type="number"
            value={groupSize}
            onChange={handleNumberChange(setGroupSize)}
          />
          <Input
            id="count"
            label="Number of strings"
            type="number"
            value={count}
            onChange={handleNumberChange(setCount)}
          />
        </Stack>
      </Panel>
      <Panel fullHeight label="Output" actions={<CopyButton value={output} />}>
        <Editor label="Output" value={output} />
      </Panel>
    </Screen>
  );
}
