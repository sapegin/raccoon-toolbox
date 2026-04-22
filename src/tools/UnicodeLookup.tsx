import { useMemo, useState } from 'react';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { Table } from '../components/Table';
import {
  type UnicodeCharacter,
  unicodeCharacters,
} from '../data/unicode-characters';

function ResultsTable({ characters }: { characters: UnicodeCharacter[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th className="w-12">Character</th>
          <th className="w-24">Code</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((char) => {
          const [code, name] = char;
          const codeString = `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;
          return (
            <tr key={code}>
              <td className="text-center font-[system-ui] text-xl">
                {String.fromCodePoint(code)}
              </td>
              <td>
                <a
                  href={`https://unicodeplus.com/${codeString}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {codeString}
                </a>
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
    <Screen style={{ gridTemplateRows: 'auto 1fr' }} className="p-2">
      <Input
        id="search"
        label="Search by name or code"
        placeholder={'Try \u201ccat\u201d or \u201cU+1F600\u201d'}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {filteredCharacters.length > 0 && (
        <div className="overflow-auto">
          <ResultsTable characters={filteredCharacters} />
        </div>
      )}
      {searchQuery.trim() && filteredCharacters.length === 0 && (
        <p className="typo-body">No characters found</p>
      )}
    </Screen>
  );
}
