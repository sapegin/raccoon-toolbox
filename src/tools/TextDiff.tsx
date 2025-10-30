import { useState, useCallback, useEffect } from 'react';
import { diffChars, diffLines } from 'diff';
import { Grid } from '../components/Grid';
import { Editor } from '../components/Editor';
import { Button } from '../components/Button';
import { VisuallyHidden } from '../../styled-system/jsx';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { Box } from '../components/Box';
import { css } from '../../styled-system/css';
import { escapeHtml } from '../util/escapeHtml';

const addedClass = css({
  backgroundColor: 'successBackground',
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
            resultHtml += `<span class="${addedClass}">${charSafe}</span>`;
          } else if (char.removed) {
            resultHtml += `<span class="${removedClass}">${charSafe}</span>`;
          } else {
            resultHtml += charSafe;
          }
        }
        // Skip both the removed and added parts
        index += 2;
      } else if (part.added) {
        resultHtml += `<span class="${addedClass}">${escapeHtml(part.value)}</span>`;
        index++;
      } else if (part.removed) {
        resultHtml += `<span class="${removedClass}">${escapeHtml(part.value)}</span>`;
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
    <>
      <VisuallyHidden as="h2">Text Diff</VisuallyHidden>
      <Grid gridTemplateRows="1fr 1fr" gap="m" height="100vh" padding="s">
        <Grid gridTemplateColumns="1fr 1fr" gap="m">
          <Panel
            label="Text A"
            actions={
              <Button onClick={handleAClear} disabled={textA === ''}>
                Clear
              </Button>
            }
          >
            <Editor value={textA} onChange={handleTextAChange} />
          </Panel>
          <Panel
            label="Text B"
            actions={
              <Button onClick={handleBClear} disabled={textB === ''}>
                Clear
              </Button>
            }
          >
            <Editor value={textB} onChange={handleTextBChange} />
          </Panel>
        </Grid>
        <Panel label="Result">
          <Box
            overflow="auto"
            height="100%"
            fontFamily="code"
            padding="s"
            whiteSpace="pre-wrap"
            border="1px solid"
            borderColor="lightBorder"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </Panel>
      </Grid>
    </>
  );
}
