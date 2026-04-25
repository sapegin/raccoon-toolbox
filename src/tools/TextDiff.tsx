import clsx from 'clsx';
import { diffChars, diffLines } from 'diff';
import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';
import { escapeHtml } from '../util/escapeHtml';

// TODO: Move to Tailwind utilities
const addedClass = clsx('bg-success-background underline');
const removedClass = clsx('bg-error-background line-through');

export function TextDiff() {
  const [textA, setTextA] = usePersistentState('textDiff.textA', '');
  const [textB, setTextB] = usePersistentState('textDiff.textB', '');

  const result = useMemo(() => {
    const lineDiff = diffLines(textA, textB);
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

    return resultHtml;
  }, [textA, textB]);

  const handleTextAChange = useCallback((value: string) => {
    setTextA(value);
  }, []);

  const handleTextBChange = useCallback((value: string) => {
    setTextB(value);
  }, []);

  const handleAClear = useCallback(() => {
    setTextA('');
  }, []);

  const handleBClear = useCallback(() => {
    setTextB('');
  }, []);

  return (
    <Screen className="grid-rows-[1fr_1fr]">
      <div className="grid h-full min-h-0 grid-cols-2 gap-2">
        <Panel
          fullHeight
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
          fullHeight
          label="Text B"
          actions={
            <Button onClick={handleBClear} disabled={textB === ''}>
              Clear
            </Button>
          }
        >
          <Editor label="Text B" value={textB} onChange={handleTextBChange} />
        </Panel>
      </div>
      <Panel
        fullHeight
        label={
          <>
            Difference
            {textA === textB && (
              <span className="typo-body text-success-foreground">
                {' '}
                (no difference)
              </span>
            )}
          </>
        }
      >
        <output htmlFor="text-a text-b">
          <div
            className="
              block h-full overflow-auto rounded-input border border-solid
              border-light-border p-2 font-mono whitespace-pre-wrap
            "
            // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </output>
      </Panel>
    </Screen>
  );
}
