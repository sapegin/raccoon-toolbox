import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { Select } from '../components/Select';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';

type SortDirection =
  | 'ascending'
  | 'descending'
  | 'reverse'
  | 'shuffle'
  | 'length'
  | 'length-reversed';

type DedupeMode = 'keep' | 'remove';

const naturalCompareRegex = /(\d+)|(\D+)/g;
const isNumberRegex = /^\d+$/;

function naturalCompare(a: string, b: string): number {
  const aParts = a.match(naturalCompareRegex) ?? [];
  const bParts = b.match(naturalCompareRegex) ?? [];

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] ?? '';
    const bPart = bParts[i] ?? '';

    const aIsNum = isNumberRegex.test(aPart);
    const bIsNum = isNumberRegex.test(bPart);

    if (aIsNum && bIsNum) {
      const diff = Number.parseInt(aPart, 10) - Number.parseInt(bPart, 10);
      if (diff !== 0) {
        return diff;
      }
    } else {
      const aLower = aPart.toLowerCase();
      const bLower = bPart.toLowerCase();
      if (aLower < bLower) {
        return -1;
      }
      if (aLower > bLower) {
        return 1;
      }
    }
  }

  return 0;
}

// TODO: We may already have this in one of the other tools
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function toLines(text: string, dedupe: DedupeMode) {
  const lines = text
    // Split lines
    .split('\n')
    // Trim leading/trailing whitespace
    .map((line) => line.trim())
    // Remove empty lines
    .filter((line) => line !== '');

  // Remove duplicates if needed
  return dedupe === 'keep' ? lines : Array.from(new Set(lines));
}

function sortLines(lines: string[], direction: SortDirection) {
  switch (direction) {
    case 'ascending':
      return lines.toSorted(naturalCompare);
    case 'descending':
      return lines.toSorted((a, b) => naturalCompare(b, a));
    case 'reverse':
      return lines.toReversed();
    case 'shuffle':
      return shuffleArray(lines);
    case 'length':
      return lines.toSorted(
        (a, b) => a.length - b.length || naturalCompare(a, b)
      );
    case 'length-reversed':
      return lines.toSorted(
        (a, b) => b.length - a.length || naturalCompare(a, b)
      );
  }
}

export function LineSort() {
  const [input, setInput] = usePersistentState('lineSort.input', '');
  const [sortDirection, setSortDirection] = usePersistentState<SortDirection>(
    'lineSort.sortDirection',
    'ascending'
  );
  const [dedupeMode, setDedupeMode] = usePersistentState<DedupeMode>(
    'lineSort.dedupeMode',
    'keep'
  );
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setInput(value);
      processLines(value, sortDirection, dedupeMode);
    },
    [sortDirection, dedupeMode]
  );

  const processLines = useCallback(
    (value: string, direction: SortDirection, dedupe: DedupeMode) => {
      const lines = toLines(value, dedupe);
      const sortedLines = sortLines(lines, direction);
      setOutput(sortedLines.join('\n'));
    },
    []
  );

  useEffect(() => {
    if (input) {
      processLines(input, sortDirection, dedupeMode);
    }
  }, [sortDirection, dedupeMode, input, processLines]);

  const handleSortDirectionChange = useCallback((value: string) => {
    setSortDirection(value as SortDirection);
  }, []);

  const handleDedupeModeChange = useCallback((value: string) => {
    setDedupeMode(value as DedupeMode);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  return (
    <Screen gridTemplateColumns="1fr 1fr">
      <Panel
        fullHeight
        label="Input"
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor label="Input" value={input} onChange={handleChange} />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        actions={
          <>
            <Select
              id="sort-direction"
              accessibleLabel="Sort direction"
              value={sortDirection}
              onChange={(e) => handleSortDirectionChange(e.target.value)}
              options={[
                { value: 'ascending', label: 'Ascending' },
                { value: 'descending', label: 'Descending' },
                { value: 'reverse', label: 'Reverse' },
                { value: 'shuffle', label: 'Shuffle' },
                { value: 'length', label: 'Length' },
                { value: 'length-reversed', label: 'Length reversed' },
              ]}
            />
            <ToggleButton
              accessibleLabel="Duplicates handling"
              name="dedupe-mode"
              value={dedupeMode}
              options={[
                { value: 'keep', label: 'All' },
                { value: 'remove', label: 'Unique' },
              ]}
              onChange={handleDedupeModeChange}
            />
            <CopyButton value={output} />
          </>
        }
      >
        <Editor label="Output" value={output} />
      </Panel>
    </Screen>
  );
}
