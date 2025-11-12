import { useMemo, useState } from 'react';
import { css } from '../../styled-system/css';
import { Box, Link } from '../../styled-system/jsx';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { Table } from '../components/Table';
import { Text } from '../components/Text';
import {
  type UnicodeCharacter,
  unicodeCharacters,
} from '../data/unicode-characters';

function ResultsTable({ characters }: { characters: UnicodeCharacter[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th className={css({ width: '3rem' })}>Character</th>
          <th className={css({ width: '6rem' })}>Code</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((char) => {
          const [code, name] = char;
          const codeString = `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;
          return (
            <tr key={code}>
              <td
                className={css({
                  fontSize: 'xl',
                  fontFamily: 'system-ui',
                  textAlign: 'center',
                })}
              >
                {String.fromCodePoint(code)}
              </td>
              <td>
                <Link
                  href={`https://unicodeplus.com/${codeString}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {codeString}
                </Link>
              </td>
              <td>{name}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export function UnicodeLookup() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharacters = useMemo(() => {
    if (searchQuery.trim() === '') {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const isHexCode = /^u\+?[0-9a-f]+$/i.test(query);

    if (isHexCode) {
      const hexValue = query.replace(/^u\+?/i, '');
      const codePoint = Number.parseInt(hexValue, 16);
      return unicodeCharacters.filter(([code]) => code === codePoint);
    }

    const wordBoundaryRegex = new RegExp(String.raw`\b${query}\b`, 'i');

    const matches = unicodeCharacters.filter(([, name]) =>
      name.toLowerCase().includes(query)
    );

    // Match full words: cat → SMILING CAT FACE WITH OPEN MOUTH
    const fullWordMatches = matches.filter(([, name]) =>
      wordBoundaryRegex.test(name)
    );

    // Partial matches: cat → FEMININE ORDINAL INDICATOR
    const partialMatches = matches.filter(
      ([, name]) => wordBoundaryRegex.test(name) === false
    );

    return [...fullWordMatches, ...partialMatches].slice(0, 100);
  }, [searchQuery]);

  return (
    <Screen gridTemplateRows="auto 1fr" p="s">
      <Input
        id="search"
        label="Search by name or code"
        placeholder="Try “cat” or “U+1F600”"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {filteredCharacters.length > 0 && (
        <Box overflow="auto">
          <ResultsTable characters={filteredCharacters} />
        </Box>
      )}
      {searchQuery.trim() && filteredCharacters.length === 0 && (
        <Text>No characters found</Text>
      )}
    </Screen>
  );
}
