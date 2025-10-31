import { useCallback, useEffect, useState } from 'react';
import { Grid } from '../components/Grid';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { VisuallyHidden } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { calculateTextStats, type TextStats } from '../util/text-stats';

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <Stack>
      <Text as="dt" variant="small">
        {label}
      </Text>
      <Text as="dd" variant="large">
        {value}
      </Text>
    </Stack>
  );
}

export function TextStats() {
  const [text, setText] = usePersistentState('textStats.text', '');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersWithoutWhitespace: 0,
    lines: 0,
    words: 0,
    paragraphs: 0,
    sentences: 0,
    readingTimeMinutes: 0,
  });

  useEffect(() => {
    if (text !== '') {
      setStats(calculateTextStats(text));
    }
  }, []);

  const handleTextChange = useCallback(
    (value: string) => {
      setText(value);
      setStats(calculateTextStats(value));
    },
    [setText]
  );

  const handleClear = useCallback(() => {
    setText('');
    setStats({
      characters: 0,
      charactersWithoutWhitespace: 0,
      lines: 0,
      words: 0,
      paragraphs: 0,
      sentences: 0,
      readingTimeMinutes: 0,
    });
  }, [setText]);

  return (
    <>
      <VisuallyHidden as="h2">Text stats</VisuallyHidden>
      <Grid gridTemplateColumns="1fr 12rem" gap="m" height="100vh" padding="s">
        <Panel
          label="Text"
          actions={
            <Button onClick={handleClear} disabled={text === ''}>
              Clear
            </Button>
          }
        >
          <Editor value={text} onChange={handleTextChange} />
        </Panel>
        <Panel label="Statistics">
          <Stack as="dl" gap="m">
            <StatItem label="Characters" value={stats.characters} />
            <StatItem
              label="Non-space characters"
              value={stats.charactersWithoutWhitespace}
            />
            <StatItem label="Lines" value={stats.lines} />
            <StatItem label="Words" value={stats.words} />
            <StatItem label="Paragraphs" value={stats.paragraphs} />
            <StatItem label="Sentences" value={stats.sentences} />
            <StatItem
              label="Reading time"
              value={`${stats.readingTimeMinutes} min`}
            />
          </Stack>
        </Panel>
      </Grid>
    </>
  );
}
