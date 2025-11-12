import { useEffect, useState } from 'react';
import { Stack } from '../../styled-system/jsx/stack';
import { Screen } from '../components/Screen';
import { LargeValue } from '../components/LargeValue';
import { Text } from '../components/Text';
import { Grid } from '../../styled-system/jsx/grid';
import { VisuallyHidden } from '../../styled-system/jsx';

interface KeyInfo {
  displayName: string;
  key: string;
  code: string;
  keyCode: number;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}

function MetaKey({
  label,
  pictogram,
  enabled,
}: {
  label: string;
  pictogram: string;
  enabled: boolean;
}) {
  return (
    <Text color={enabled ? 'activeForeground' : 'disabledForeground'}>
      <span aria-hidden>{pictogram}</span>
      {` ${label} `}
      <VisuallyHidden as="span">
        {enabled ? '(pressed)' : '(not pressed)'}
      </VisuallyHidden>
    </Text>
  );
}

const MODIFIER_KEYS = ['Shift', 'Control', 'Meta', 'Alt'];

const getDisplayName = (event: globalThis.KeyboardEvent) => {
  const parts: string[] = [];
  const isModifierKey = MODIFIER_KEYS.includes(event.key);

  // Add name of the modifier key if it's not the only key pressed
  if (event.shiftKey && event.key !== 'Shift') {
    parts.push('Shift');
  }
  if (event.ctrlKey && event.key !== 'Control') {
    parts.push('Ctrl');
  }
  if (event.metaKey && event.key !== 'Meta') {
    parts.push('Meta');
  }
  if (event.altKey && event.key !== 'Alt') {
    parts.push('Alt');
  }

  const key = event.key;
  if (key === ' ') {
    parts.push('Space');
  } else if (key === 'Control') {
    parts.push('Ctrl');
  } else if (isModifierKey === false && key.length === 1) {
    const digitMatch = event.code.match(/^Digit(\d)$/);
    if (digitMatch) {
      // When Shift+digit is pressed, shown a digit, not an actual key (Shift+2
      // instead of Shift+@)
      parts.push(digitMatch[1]);
    } else {
      parts.push(key.toUpperCase());
    }
  } else {
    parts.push(key);
  }

  return parts.join('+');
};

export function KeyCodes() {
  const [keyInfo, setKeyInfo] = useState<KeyInfo>();

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      setKeyInfo({
        displayName: getDisplayName(event),
        key: event.key,
        code: event.code,
        keyCode: event.keyCode,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Screen>
      <Stack gap="xl" alignItems="center" justifyContent="center" height="100%">
        <Stack gap="m" alignItems="center">
          {keyInfo ? (
            <Text variant="xlarge" color="activeForeground">
              {keyInfo.displayName}
            </Text>
          ) : (
            <Text variant="large" color="secondaryTextForeground">
              Press any key
            </Text>
          )}
        </Stack>
        {keyInfo && (
          <Stack gap="l" width="100%" maxWidth="48rem">
            <Grid as="dl" gridTemplateColumns="1fr 1fr 1fr 1fr" gap="m">
              <LargeValue label="Key" value={keyInfo.key} />
              <LargeValue label="Code" value={keyInfo.code} />
              <LargeValue label="Key code" value={keyInfo.keyCode} />
              <Stack gap="xs">
                <Text as="dt">Modifiers</Text>
                <Grid
                  as="dd"
                  gridTemplateColumns="auto 1fr"
                  gridTemplateRows="1fr 1fr"
                  columnGap="m"
                  rowGap="xs"
                >
                  <MetaKey
                    enabled={keyInfo.shiftKey}
                    label="Shift"
                    pictogram="⇧"
                  />
                  <MetaKey
                    enabled={keyInfo.ctrlKey}
                    label="Ctrl"
                    pictogram="⌃"
                  />
                  <MetaKey
                    enabled={keyInfo.metaKey}
                    label="Meta"
                    pictogram="⌘"
                  />
                  <MetaKey enabled={keyInfo.altKey} label="Alt" pictogram="⌥" />
                </Grid>
              </Stack>
            </Grid>
          </Stack>
        )}
      </Stack>
    </Screen>
  );
}
