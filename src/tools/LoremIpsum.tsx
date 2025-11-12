import { useCallback, useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { Select } from '../components/Select';
import { usePersistentState } from '../hooks/usePersistentState';
import {
  corpora,
  generateLoremIpsum,
  type LengthOption,
  lengthOptions,
} from '../util/lorem-ipsum';

export function LoremIpsum() {
  const [corpusId, setCorpusId] = usePersistentState(
    'loremIpsum.corpusId',
    'latin'
  );
  const [length, setLength] = usePersistentState<LengthOption>(
    'loremIpsum.length',
    '1-paragraph'
  );

  const corpus = corpora.find((c) => c.id === corpusId) ?? corpora[0];
  const [output, setOutput] = useState(() =>
    generateLoremIpsum(corpus, length)
  );

  const handleRefresh = useCallback(() => {
    setOutput(generateLoremIpsum(corpus, length));
  }, [corpus, length]);

  const handleCorpusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newCorpusId = event.target.value;
      setCorpusId(newCorpusId);
      const newCorpus = corpora.find((c) => c.id === newCorpusId) ?? corpora[0];
      setOutput(generateLoremIpsum(newCorpus, length));
    },
    [length, setCorpusId]
  );

  const handleLengthChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLength = event.target.value as LengthOption;
      setLength(newLength);
      setOutput(generateLoremIpsum(corpus, newLength));
    },
    [corpus, setLength]
  );

  return (
    <Screen gridTemplateColumns="1fr">
      <Panel
        fullHeight
        label="Output"
        actions={
          <>
            <Select
              accessibleLabel="Text corpus"
              id="corpus"
              options={corpora.map((c) => ({ value: c.id, label: c.name }))}
              value={corpusId}
              onChange={handleCorpusChange}
            />
            <Select
              accessibleLabel="Length"
              id="length"
              options={lengthOptions.map((l) => ({
                value: l.id,
                label: l.name,
              }))}
              value={length}
              onChange={handleLengthChange}
            />
            <Button onClick={handleRefresh}>Refresh</Button>
            <CopyButton value={output} />
          </>
        }
      >
        <Editor label="Output" value={output} />
      </Panel>
    </Screen>
  );
}
