import { useState, useCallback, useEffect } from 'react';
import { diffChars, diffLines } from 'diff';
import { Grid, Box } from '../../styled-system/jsx';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { css } from '../../styled-system/css';
import { escapeHtml } from '../util/escapeHtml';
import { Screen } from '../components/Screen';

const addedClass = css({
  backgroundColor: 'successBackground',
  textDecoration: 'underline',
});

const removedClass = css({
  backgroundColor: 'errorBackground',
  textDecoration: 'line-through',
});

export function TextDiff() {
  const [textA, setTextA] = usePersistentState('textDiff.textA', '');
  const [textB, setTextB] = usePersistentState('textDiff.textB', '');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (textA !== '' || textB !== '') {
      calculateDiff(textA, textB);
    }
  }, []);

  const calculateDiff = useCallback((a: string, b: string) => {
    const lineDiff = diffLines(a, b);
    let resultHtml = '';
    let index = 0;

    while (index < lineDiff.length) {
      const part = lineDiff[index];

      if (part.removed && lineDiff[index + 1]?.added) {
        // Found a removed line followed by an added line -- do character diff
        const removed = lineDiff[index];
        const added = lineDiff[index + 1];
        const charDiff = diffChars(removed.value, added.value);

        for (const char of charDiff) {
          const charSafe = escapeHtml(char.value);
          if (char.added) {
            resultHtml += `<ins class="${addedClass}">${charSafe}</ins>`;
          } else if (char.removed) {
            resultHtml += `<del class="${removedClass}">${charSafe}</del>`;
          } else {
            resultHtml += charSafe;
          }
        }
        // Skip both the removed and added parts
        index += 2;
      } else if (part.added) {
        resultHtml += `<ins class="${addedClass}">${escapeHtml(part.value)}</ins>`;
        index++;
      } else if (part.removed) {
        resultHtml += `<del class="${removedClass}">${escapeHtml(part.value)}</del>`;
        index++;
      } else {
        resultHtml += escapeHtml(part.value);
        index++;
      }
    }

    setResult(resultHtml);
  }, []);

  const handleTextAChange = useCallback(
    (value: string) => {
      setTextA(value);
      calculateDiff(value, textB);
    },
    [textB, calculateDiff]
  );

  const handleTextBChange = useCallback(
    (value: string) => {
      setTextB(value);
      calculateDiff(textA, value);
    },
    [textA, calculateDiff]
  );

  const handleAClear = useCallback(() => {
    setTextA('');
  }, []);

  const handleBClear = useCallback(() => {
    setTextB('');
  }, []);

  return (
    <Screen gridTemplateRows="1fr 1fr">
      <Grid gridTemplateColumns="1fr 1fr" gap="m">
        <Panel
          label="Text A"
          actions={
            <Button onClick={handleAClear} disabled={textA === ''}>
              Clear
            </Button>
          }
        >
          <Editor label="Text A" value={textA} onChange={handleTextAChange} />
        </Panel>
        <Panel
          label="Text B"
          actions={
            <Button onClick={handleBClear} disabled={textB === ''}>
              Clear
            </Button>
          }
        >
          <Editor label="Text B" value={textB} onChange={handleTextBChange} />
        </Panel>
      </Grid>
      <Panel fullHeight label="Difference">
        <output htmlFor="text-a text-b">
          <Box
            display="block"
            overflow="auto"
            height="100%"
            fontFamily="code"
            padding="s"
            whiteSpace="pre-wrap"
            border="1px solid"
            borderColor="lightBorder"
            borderRadius="input"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </output>
      </Panel>
    </Screen>
  );
}
