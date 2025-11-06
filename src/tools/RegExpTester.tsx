import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { Stack, Grid } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { RegExpCheatSheet } from '../components/RegExpCheatSheet';

const defaultFormatter = String.raw`$0\n`;

// TODO: Fix editor losing focus on every edit

function formatMatches(matches: RegExpExecArray[], formatter: string) {
  return matches
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
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);
  const [highlightRegexp, setHighlightRegexp] = useState<RegExp>();

  useEffect(() => {
    if (regexpInput !== '' && textInput !== '') {
      handleMatch();
    }
  }, []);

  const parseRegExp = (input: string): RegExp | undefined => {
    try {
      if (input.startsWith('/')) {
        // Full regexp provided: /[0-9a-f]+/g
        const lastSlash = input.lastIndexOf('/');
        if (lastSlash > 0) {
          const pattern = input.slice(1, lastSlash);
          const flagsRaw = input.slice(lastSlash + 1);
          // Automatically add global flag, as it's a requirement of both
          // matchAll and CodeMirror's MatchDecorator
          const flags = flagsRaw.includes('g') ? flagsRaw : `${flagsRaw}g`;
          return new RegExp(pattern, flags);
        }
      }

      // Partial regexp provided: [0-9a-f]+, treat it as global
      return new RegExp(input, 'g');
    } catch {
      return undefined;
    }
  };

  const handleMatch = useCallback(() => {
    try {
      const regexp = parseRegExp(regexpInput);
      if (regexp === undefined) {
        setErrorMessage('Invalid regular expression');
        setOutput('');
        setHighlightRegexp(undefined);
        return;
      }

      const matchesRaw = Array.from(textInput.matchAll(regexp));

      // Do nothing if there are no matches or only empty string matches, as we
      // cannot highlight anything or show a list of matches in such cases. They
      // also cause infinite loops in the CodeMirror's MatchDecorator
      if (matchesRaw.every((match) => match[0] === '')) {
        setOutput('');
        setErrorMessage('');
        setHighlightRegexp(undefined);
        return;
      }

      setHighlightRegexp(regexp);
      setMatches(matchesRaw);
      setErrorMessage('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setOutput('');
      }
    }
  }, [regexpInput, textInput]);

  useEffect(() => {
    handleMatch();
  }, [regexpInput, textInput, handleMatch]);

  useEffect(() => {
    setOutput(formatMatches(matches, formatter));
  }, [regexpInput, textInput, formatter]);

  useEffect(() => {
    handleMatch();
  }, [regexpInput, textInput, handleMatch]);

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
      <Stack gap="m" minHeight={0} height="100%" p="s">
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
        <Panel fullHeight label="Text" p={0}>
          <Editor
            label="Text"
            value={textInput}
            onChange={setTextInput}
            highlightRegexp={highlightRegexp}
          />
        </Panel>
      </Stack>
      <Grid
        gridTemplateColumns="1fr 1fr"
        gap="m"
        minHeight={0}
        height="100%"
        p="s"
      >
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
            p={0}
          >
            <Editor label="Matches" value={output} editable={false} />
          </Panel>
        </Stack>
        <RegExpCheatSheet />
      </Grid>
    </Screen>
  );
}
