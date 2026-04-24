import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Input } from '../components/Input';
import { Panel } from '../components/Panel';
import { RegExpCheatSheet } from '../components/RegExpCheatSheet';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';
import { useRegExpWorker } from '../hooks/useRegExpWorker';

const defaultFormatter = String.raw`$0\n`;

function formatMatches(
  matches: { groups: (string | undefined)[] }[],
  formatter: string
) {
  return matches
    .map((match) => {
      let result = formatter;

      for (const [index, group] of match.groups.entries()) {
        result = result.replaceAll(
          new RegExp(String.raw`\$${index}`, 'g'),
          group ?? ''
        );
      }

      // Replace escaped whitespace with actual whitespace and return
      return result
        .replaceAll(String.raw`\n`, '\n')
        .replaceAll(String.raw`\t`, '\t');
    })
    .join('');
}

function parseRegExpInput(input: string):
  | {
      pattern: string;
      flags: string;
    }
  | undefined {
  if (input === '') {
    return undefined;
  }

  try {
    if (input.startsWith('/')) {
      const lastSlash = input.lastIndexOf('/');
      if (lastSlash > 0) {
        const pattern = input.slice(1, lastSlash);
        const flags = input.slice(lastSlash + 1);
        return { pattern, flags };
      }
    }

    return { pattern: input, flags: 'g' };
  } catch {
    return undefined;
  }
}

export function RegExpTester() {
  const [regexpInput, setRegexpInput] = usePersistentState(
    'regexpTester.regexp',
    ''
  );
  const [textInput, setTextInput] = usePersistentState('regexpTester.text', '');
  const [formatter, setFormatter] = usePersistentState(
    'regexpTester.formatter',
    defaultFormatter
  );

  const regexpParsed = useMemo(
    () => parseRegExpInput(regexpInput),
    [regexpInput]
  );

  const { matches, error: workerError } = useRegExpWorker(
    textInput,
    regexpParsed?.pattern ?? '',
    regexpParsed?.flags ?? ''
  );

  const errorMessage = useMemo(() => {
    if (regexpInput !== '' && regexpParsed === undefined) {
      return 'Invalid regular expression';
    }
    return workerError;
  }, [regexpInput, regexpParsed, workerError]);

  const highlightRanges = useMemo(() => {
    return matches.map((match) => ({
      from: match.index,
      to: match.index + match.length,
    }));
  }, [matches]);

  const output = useMemo(() => {
    return formatMatches(matches, formatter);
  }, [matches, formatter]);

  const handleClear = useCallback(() => {
    setRegexpInput('');
    setTextInput('');
    setFormatter(defaultFormatter);
  }, []);

  return (
    <Screen className="grid-rows-[1fr_1fr]">
      <div className="flex h-full min-h-0 flex-col gap-4 p-2">
        <Input
          id="regexp-input"
          label="Regular expression"
          placeholder="[0-9a-f]+ or /[0-9a-f]+/g"
          value={regexpInput}
          onChange={(e) => setRegexpInput(e.target.value)}
          errorMessage={errorMessage}
          actions={
            <Button onClick={handleClear} disabled={regexpInput === ''}>
              Clear
            </Button>
          }
        />
        <Panel fullHeight noPadding label="Text">
          <Editor
            label="Text"
            value={textInput}
            onChange={setTextInput}
            highlightRanges={highlightRanges}
          />
        </Panel>
      </div>
      <div className="grid h-full min-h-0 grid-cols-2 gap-4 p-2">
        <div className="flex h-full min-h-0 flex-col gap-4">
          <Input
            id="formatter"
            label="Match formatter"
            value={formatter}
            onChange={(e) => setFormatter(e.target.value)}
            placeholder={defaultFormatter}
          />
          <Panel
            fullHeight
            noPadding
            label="Matches"
            actions={<CopyButton value={output} />}
          >
            <Editor label="Matches" value={output} />
          </Panel>
        </div>
        <RegExpCheatSheet />
      </div>
    </Screen>
  );
}
