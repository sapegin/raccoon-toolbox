import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { LargeValue } from '../components/LargeValue';
import { Screen } from '../components/Screen';

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
    <p
      className={clsx(
        `typo-body`,
        enabled ? 'text-active-foreground' : 'text-disabled-foreground'
      )}
    >
      <span aria-hidden>{pictogram}</span>
      {` ${label} `}
      <span className="sr-only">{enabled ? '(pressed)' : '(not pressed)'}</span>
    </p>
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
      <div className="flex h-full flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center gap-4">
          {keyInfo ? (
            <p className="typo-xlarge">{keyInfo.displayName}</p>
          ) : (
            <p className="typo-large text-secondary-text-foreground">
              Press any key
            </p>
          )}
        </div>
        {keyInfo && (
          <div className="flex w-full max-w-3xl flex-col gap-8">
            <dl className="grid grid-cols-4 gap-4">
              <LargeValue label="Key" value={keyInfo.key} />
              <LargeValue label="Code" value={keyInfo.code} />
              <LargeValue label="Key code" value={keyInfo.keyCode} />
              <div className="flex flex-col gap-1">
                <dt className="typo-body">Modifiers</dt>
                <dd
                  className="
                    grid grid-cols-[auto_1fr] grid-rows-[1fr_1fr] gap-x-4
                    gap-y-1
                  "
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
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </Screen>
  );
}
