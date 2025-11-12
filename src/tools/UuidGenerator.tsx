import { useState, useCallback, useEffect } from 'react';
import { Editor } from '../components/Editor';
import { usePersistentState } from '../hooks/usePersistentState';
import { Panel } from '../components/Panel';
import { CopyButton } from '../components/CopyButton';
import { Select } from '../components/Select';
import { ToggleButton } from '../components/ToggleButton';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { Stack } from '../components/Stack';
import { Box } from '../../styled-system/jsx/box';

function generateUuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replaceAll(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function formatUuid(
  uuid: string,
  withHyphens: boolean,
  uppercase: boolean
): string {
  const formatted = withHyphens ? uuid : uuid.replaceAll('-', '');
  return uppercase ? formatted.toUpperCase() : formatted;
}

export function UuidGenerator() {
  const [version, setVersion] = usePersistentState(
    'uuidGenerator.version',
    '4'
  );
  const [withHyphens, setWithHyphens] = usePersistentState(
    'uuidGenerator.withHyphens',
    'true'
  );
  const [caseType, setCaseType] = usePersistentState(
    'uuidGenerator.caseType',
    'lowercase'
  );
  const [count, setCount] = usePersistentState('uuidGenerator.count', '1');
  const [output, setOutput] = useState('');

  const generateUuids = useCallback(() => {
    const numCount = Number.parseInt(count, 10);
    if (Number.isNaN(numCount) || numCount < 1) {
      setOutput('');
      return;
    }

    const uuids = Array.from({ length: numCount }, () => {
      const uuid = generateUuidV4();
      return formatUuid(uuid, withHyphens === 'true', caseType === 'uppercase');
    });

    setOutput(uuids.join('\n'));
  }, [count, withHyphens, caseType]);

  useEffect(() => {
    generateUuids();
  }, [generateUuids]);

  const handleVersionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setVersion(event.target.value);
    },
    [setVersion]
  );

  const handleCountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === '' || /^\d+$/.test(value)) {
        setCount(value);
      }
    },
    [setCount]
  );

  return (
    <Screen gridTemplateColumns="17rem 1fr">
      <Panel fullHeight accessibleLabel="Configuration">
        <Stack gap="m" alignItems="start">
          <Select
            id="version"
            label="UUID version"
            options={[{ value: '4', label: 'Version 4' }]}
            value={version}
            onChange={handleVersionChange}
          />
          <ToggleButton
            label="Formatting"
            name="hyphens"
            value={withHyphens}
            onChange={setWithHyphens}
            options={[
              { value: 'true', label: 'With hyphens' },
              { value: 'false', label: 'Without hyphens' },
            ]}
          />
          <ToggleButton
            label="Casing"
            name="case"
            value={caseType}
            onChange={setCaseType}
            options={[
              { value: 'lowercase', label: 'Lowercase' },
              { value: 'uppercase', label: 'Uppercase' },
            ]}
          />
          <Box width="100%">
            <Input
              id="count"
              label="Number of UUIDs"
              type="number"
              value={count}
              onChange={handleCountChange}
            />
          </Box>
        </Stack>
      </Panel>
      <Panel fullHeight label="Output" actions={<CopyButton value={output} />}>
        <Editor label="Output" value={output} />
      </Panel>
    </Screen>
  );
}
