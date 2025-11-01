import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { Stack } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';

// TODO: Add a button to show cheat sheet
// TODO: Add a button to show docs
// TODO: Add a button to show help for the formatter input

const defaultFormatter = String.raw`$0\n`;

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
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [highlightRegexp, setHighlightRegexp] = useState<RegExp | undefined>(
    undefined
  );

  useEffect(() => {
    if (regexpInput !== '' && textInput !== '') {
      handleMatch();
    }
  }, []);

  const parseRegExp = (input: string): RegExp | null => {
    try {
      if (input.startsWith('/')) {
        // Full regexp provided: /[0-9a-f]+/g
        const lastSlash = input.lastIndexOf('/');
        if (lastSlash > 0) {
          const pattern = input.slice(1, lastSlash);
          const flags = input.slice(lastSlash + 1);
          return new RegExp(pattern, flags);
        }
      }

      // Partial regexp provided: [0-9a-f]+, treat it as global
      return new RegExp(input, 'g');
    } catch {
      return null;
    }
  };

  const handleMatch = useCallback(() => {
    try {
      const regexp = parseRegExp(regexpInput);
      if (regexp === null) {
        setErrorMessage('Invalid regular expression');
        setOutput('');
        setHighlightRegexp(undefined);
        return;
      }

      setHighlightRegexp(regexp);

      const matches = Array.from(textInput.matchAll(regexp));
      if (matches.length === 0) {
        setOutput('');
        setErrorMessage('');
        return;
      }

      const formattedMatches = matches
        .map((match) => {
          let result = formatter;
          for (const [index, group] of match.entries()) {
            result = result.replaceAll(
              new RegExp(String.raw`\$${index}`, 'g'),
              group || ''
            );
          }

          // Replace escaped whitespace with actual whitespace and return
          return result
            .replaceAll(String.raw`\n`, '\n')
            .replaceAll(String.raw`\t`, '\t');
        })
        .join('');

      setOutput(formattedMatches);
      setErrorMessage('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setOutput('');
      }
    }
  }, [regexpInput, textInput, formatter]);

  useEffect(() => {
    handleMatch();
  }, [regexpInput, textInput, formatter, handleMatch]);

  // TODO: This button clears everything which may be confusing
  const handleClear = useCallback(() => {
    setRegexpInput('');
    setTextInput('');
    setFormatter(defaultFormatter);
    setOutput('');
    setErrorMessage('');
    setHighlightRegexp(undefined);
  }, []);

  return (
    <Screen gridTemplateRows="1fr 1fr">
      <Stack gap="m" minHeight={0} height="100%">
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
        <Panel fullHeight label="Text">
          <Editor
            value={textInput}
            onChange={setTextInput}
            highlightRegexp={highlightRegexp}
          />
        </Panel>
      </Stack>
      <Stack gap="m" minHeight={0} height="100%">
        <Input
          id="formatter"
          label="Match formatter"
          value={formatter}
          onChange={(e) => setFormatter(e.target.value)}
          placeholder={defaultFormatter}
        />
        <Panel
          fullHeight
          label="Matches"
          actions={<CopyButton value={output} />}
        >
          <Editor value={output} editable={false} />
        </Panel>
      </Stack>
    </Screen>
  );
}
