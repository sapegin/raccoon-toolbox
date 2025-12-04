import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { Select } from '../components/Select';
import { Text } from '../components/Text';
import { usePersistentState } from '../hooks/usePersistentState';

// Common Cyrillic encodings supported by TextDecoder
const ENCODINGS = [
  { value: 'windows-1251', label: 'Windows-1251' },
  { value: 'koi8-r', label: 'KOI8-R' },
  { value: 'iso-8859-5', label: 'ISO-8859-5' },
  { value: 'ibm866', label: 'IBM866' },
  { value: 'mac-cyrillic', label: 'MacCyrillic' },
];
const ENCODING_OPTIONS = [{ value: 'auto', label: 'Auto' }, ...ENCODINGS];

// Windows-1252 characters (0x80-0x9F) that map to specific bytes. The rest map
// 1:1 with Unicode code points
const WINDOWS_1252_MAP: Record<string, number | undefined> = {
  '€': 0x80,
  '‚': 0x82,
  ƒ: 0x83,
  '„': 0x84,
  '…': 0x85,
  '†': 0x86,
  '‡': 0x87,
  ˆ: 0x88,
  '‰': 0x89,
  Š: 0x8a,
  '‹': 0x8b,
  Œ: 0x8c,
  Ž: 0x8e,
  '‘': 0x91,
  '’': 0x92,
  '“': 0x93,
  '”': 0x94,
  '•': 0x95,
  '–': 0x96,
  '—': 0x97,
  '˜': 0x98,
  '™': 0x99,
  š: 0x9a,
  '›': 0x9b,
  œ: 0x9c,
  ž: 0x9e,
  Ÿ: 0x9f,
};

function stringToBytes(text: string): Uint8Array {
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = text.codePointAt(i) ?? 0;
    const mapped = WINDOWS_1252_MAP[char];
    if (code < 0x80) {
      bytes[i] = code;
    } else if (mapped !== undefined) {
      bytes[i] = mapped;
    } else if (code >= 0xa0 && code <= 0xff) {
      bytes[i] = code;
    } else {
      // Fallback for characters not in Windows-1252: use low byte
      bytes[i] = code & 0xff;
    }
  }
  return bytes;
}

function countCyrillic(text: string): number {
  // Cyrillic Unicode block: U+0400 - U+04FF
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.codePointAt(i) ?? 0;
    if (code >= 0x04_00 && code <= 0x04_ff) {
      count++;
    }
  }
  return count;
}

function decode(bytes: Uint8Array, encoding: string): string {
  try {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(bytes);
  } catch {
    return '';
  }
}

function detectEncoding(bytes: Uint8Array): string {
  let bestEncoding = 'windows-1251';
  let maxCyrillic = -1;

  for (const { value } of ENCODINGS) {
    const text = decode(bytes, value);
    const count = countCyrillic(text);
    if (count > maxCyrillic) {
      maxCyrillic = count;
      bestEncoding = value;
    }
  }

  return bestEncoding;
}

export function TextDecoderTool() {
  const [input, setInput] = usePersistentState('textDecoder.input', '');
  const [encoding, setEncoding] = usePersistentState(
    'textDecoder.encoding',
    'auto'
  );

  const { output, detectedEncoding } = useMemo(() => {
    if (input.trim() === '') {
      return { output: '', detectedEncoding: undefined };
    }

    const bytes = stringToBytes(input);
    const actualEncoding =
      encoding === 'auto' ? detectEncoding(bytes) : encoding;
    const decoded = decode(bytes, actualEncoding);

    return { output: decoded, detectedEncoding: actualEncoding };
  }, [input, encoding]);

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  return (
    <Screen gridTemplateColumns="1fr 1fr">
      <Panel
        fullHeight
        label="Input"
        actions={
          <>
            <Select
              id="encoding"
              accessibleLabel="Encoding"
              value={encoding}
              onChange={(e) => setEncoding(e.target.value)}
              options={ENCODING_OPTIONS}
            />
            <Button onClick={handleClear} disabled={input === ''}>
              Clear
            </Button>
          </>
        }
      >
        <Editor label="Input" value={input} onChange={setInput} />
      </Panel>
      <Panel
        fullHeight
        label="Output"
        actions={
          <>
            {encoding === 'auto' && detectedEncoding && (
              <Text variant="small">
                Detected:{' '}
                {ENCODINGS.find((e) => e.value === detectedEncoding)?.label ??
                  detectedEncoding}
              </Text>
            )}
            <CopyButton value={output} />
          </>
        }
      >
        <Editor label="Output" value={output} />
      </Panel>
    </Screen>
  );
}
