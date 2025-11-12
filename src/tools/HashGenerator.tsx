import { md5 } from 'js-md5';
import { useCallback, useEffect, useState } from 'react';
import { Stack } from '../../styled-system/jsx';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Input } from '../components/Input';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { ToggleButton } from '../components/ToggleButton';
import { usePersistentState } from '../hooks/usePersistentState';

type Case = 'lowercase' | 'uppercase';

async function generateHash(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function HashGenerator() {
  const [input, setInput] = usePersistentState('hashGenerator.input', '');
  const [caseMode, setCaseMode] = usePersistentState<Case>(
    'hashGenerator.case',
    'lowercase'
  );
  const [md5Hash, setMd5Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha384Hash, setSha384Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');

  useEffect(() => {
    if (input !== '') {
      handleChange(input);
    }
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setInput(value);
      if (value === '') {
        setMd5Hash('');
        setSha1Hash('');
        setSha256Hash('');
        setSha384Hash('');
        setSha512Hash('');
        return;
      }

      void (async () => {
        try {
          const md5Result = md5(value);
          const sha1 = await generateHash(value, 'SHA-1');
          const sha256 = await generateHash(value, 'SHA-256');
          const sha384 = await generateHash(value, 'SHA-384');
          const sha512 = await generateHash(value, 'SHA-512');

          const format = (hash: string) =>
            caseMode === 'uppercase' ? hash.toUpperCase() : hash;

          setMd5Hash(format(md5Result));
          setSha1Hash(format(sha1));
          setSha256Hash(format(sha256));
          setSha384Hash(format(sha384));
          setSha512Hash(format(sha512));
        } catch (error) {
          console.error('Hash generation failed:', error);
        }
      })();
    },
    [caseMode]
  );

  useEffect(() => {
    handleChange(input);
  }, [caseMode, input, handleChange]);

  const handleClear = useCallback(() => {
    setInput('');
    setMd5Hash('');
    setSha1Hash('');
    setSha256Hash('');
    setSha384Hash('');
    setSha512Hash('');
  }, []);

  const handleCaseChange = useCallback((value: string) => {
    setCaseMode(value as Case);
  }, []);

  return (
    <Screen gridTemplateColumns="1fr 1fr">
      <Panel
        fullHeight
        label="Input"
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor label="Input" value={input} onChange={handleChange} />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        actions={
          <ToggleButton
            accessibleLabel="Hash case"
            name="case"
            value={caseMode}
            options={[
              { value: 'lowercase', label: 'Lowercase' },
              { value: 'uppercase', label: 'Uppercase' },
            ]}
            onChange={handleCaseChange}
          />
        }
      >
        <Stack gap="m">
          <Input
            id="md5"
            label="MD5"
            value={md5Hash}
            readOnly
            actions={<CopyButton value={md5Hash} />}
          />
          <Input
            id="sha1"
            label="SHA-1"
            value={sha1Hash}
            readOnly
            actions={<CopyButton value={sha1Hash} />}
          />
          <Input
            id="sha256"
            label="SHA-256"
            value={sha256Hash}
            readOnly
            actions={<CopyButton value={sha256Hash} />}
          />
          <Input
            id="sha384"
            label="SHA-384"
            value={sha384Hash}
            readOnly
            actions={<CopyButton value={sha384Hash} />}
          />
          <Input
            id="sha512"
            label="SHA-512"
            value={sha512Hash}
            readOnly
            actions={<CopyButton value={sha512Hash} />}
          />
        </Stack>
      </Panel>
    </Screen>
  );
}
