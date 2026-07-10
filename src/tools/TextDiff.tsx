import clsx from 'clsx';
import { diffChars, diffLines } from 'diff';
import { Fragment, type ReactNode, useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

// TODO: Move to Tailwind utilities
const addedClass = clsx('bg-success-background underline');
const removedClass = clsx('bg-error-background line-through');

export function TextDiff() {
  const [textA, setTextA] = usePersistentState('textDiff.textA', '');
  const [textB, setTextB] = usePersistentState('textDiff.textB', '');

  const result = useMemo(() => {
    const lineDiff = diffLines(textA, textB);
    const resultParts: ReactNode[] = [];
    let index = 0;
    let key = 0;

    while (index < lineDiff.length) {
      const part = lineDiff[index];

      if (part.removed && lineDiff[index + 1]?.added) {
        // Found a removed line followed by an added line -- do character diff
        const removed = lineDiff[index];
        const added = lineDiff[index + 1];
        const charDiff = diffChars(removed.value, added.value);

        for (const char of charDiff) {
          if (char.added) {
            resultParts.push(
              <ins key={key++} className={addedClass}>
                {char.value}
              </ins>
            );
          } else if (char.removed) {
            resultParts.push(
              <del key={key++} className={removedClass}>
                {char.value}
              </del>
            );
          } else {
            resultParts.push(<Fragment key={key++}>{char.value}</Fragment>);
          }
        }
        // Skip both the removed and added parts
        index += 2;
      } else if (part.added) {
        resultParts.push(
          <ins key={key++} className={addedClass}>
            {part.value}
          </ins>
        );
        index++;
      } else if (part.removed) {
        resultParts.push(
          <del key={key++} className={removedClass}>
            {part.value}
          </del>
        );
        index++;
      } else {
        resultParts.push(<Fragment key={key++}>{part.value}</Fragment>);
        index++;
      }
    }

    return resultParts;
  }, [textA, textB]);

  const handleTextAChange = useCallback(
    (value: string) => {
      setTextA(value);
    },
    [setTextA]
  );

  const handleTextBChange = useCallback(
    (value: string) => {
      setTextB(value);
    },
    [setTextB]
  );

  const handleAClear = useCallback(() => {
    setTextA('');
  }, [setTextA]);

  const handleBClear = useCallback(() => {
    setTextB('');
  }, [setTextB]);

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
          <div className="rounded-input border-light-border block h-full overflow-auto border border-solid p-2 font-mono whitespace-pre-wrap">
            {result}
          </div>
        </output>
      </Panel>
    </Screen>
  );
}
