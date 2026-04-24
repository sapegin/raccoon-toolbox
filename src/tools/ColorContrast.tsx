import clsx from 'clsx';
import { type Colord, colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import { type ReactNode, useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { ColorPickerWithPreview } from '../components/ColorPickerWithPreview';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';
import { parseColorInput } from '../util/parseColorInput';

extend([a11yPlugin]);

const defaultTextColor = '#000000';
const defaultBackgroundColor = '#ffffff';
const textPreview =
  'Once upon a midnight dreary, while I pondered, weak and weary';

function getContrastLevel(
  ratio: number,
  isLargeText: boolean
): 'AAA' | 'AA' | 'Fail' {
  if (isLargeText) {
    if (ratio >= 4.5) {
      return 'AAA';
    }
    if (ratio >= 3) {
      return 'AA';
    }
    return 'Fail';
  }
  if (ratio >= 7) {
    return 'AAA';
  }
  if (ratio >= 4.5) {
    return 'AA';
  }
  return 'Fail';
}

function getContrastLabelColor(ratio: number) {
  const levelLargeText = getContrastLevel(ratio, true);
  if (levelLargeText === 'Fail') {
    return 'text-error-foreground';
  }

  const levelNormalText = getContrastLevel(ratio, false);
  if (levelNormalText === 'Fail') {
    return 'text-[color:var(--color-warning-foreground)]';
  }

  return 'text-active-foreground';
}

function ContrastRatio({ ratio }: { ratio: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <output htmlFor="text-color background-color">
        <div className="flex h-22 items-center">
          <p
            className={`
              typo-xlarge
              ${getContrastLabelColor(ratio)}
            `}
          >
            <span className="sr-only">Contrast ratio: </span>
            {ratio.toFixed(2)}:1
          </p>
        </div>
      </output>
      <p className="typo-body" aria-hidden>
        Contrast ratio
      </p>
    </div>
  );
}

function ContrastResult({
  label,
  hint,
  preview,
  ratio,
  isLargeText,
  textColor,
  backgroundColor,
}: {
  label: string;
  hint: string;
  preview: ReactNode;
  ratio: number;
  isLargeText: boolean;
  textColor: string;
  backgroundColor: string;
}) {
  const level = getContrastLevel(ratio, isLargeText);
  const passes = level !== 'Fail';

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={clsx(
          `
            flex h-22 w-full items-center justify-center overflow-hidden
            rounded-input border border-solid p-2 text-center
          `,
          isLargeText ? 'text-2xl/[28px]' : 'text-base/[22px]',
          passes ? 'border-light-border' : 'border-error-foreground'
        )}
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        {preview}
      </div>
      <div className="flex w-full justify-between" title={hint}>
        <p className="typo-body">{label}</p>
        <span
          className={clsx(
            'inline-flex items-center font-bold',
            passes ? 'text-success-foreground' : 'text-error-foreground'
          )}
        >
          <Icon icon={passes ? 'check' : 'xmark'} />
          {passes ? level : 'Fail'}
        </span>
      </div>
    </div>
  );
}

export function ColorContrast() {
  const [textInput, setTextInput] = usePersistentState(
    'colorContrast.textInput',
    defaultTextColor
  );
  const [backgroundInput, setBgInput] = usePersistentState(
    'colorContrast.bgInput',
    defaultBackgroundColor
  );

  const { textColor, baseTextColor, textErrorMessage } = useMemo(() => {
    const parsed = parseColorInput(textInput);
    if (parsed) {
      return { textColor: parsed, baseTextColor: parsed, textErrorMessage: '' };
    }
    if (textInput.trim() === '') {
      return {
        textColor: colord(defaultTextColor),
        baseTextColor: colord(defaultTextColor),
        textErrorMessage: '',
      };
    }
    return {
      textColor: colord(defaultTextColor),
      baseTextColor: colord(defaultTextColor),
      textErrorMessage: 'Invalid color format',
    };
  }, [textInput]);

  const { backgroundColor, baseBackgroundColor, backgroundErrorMessage } =
    useMemo(() => {
      const parsed = parseColorInput(backgroundInput);
      if (parsed) {
        return {
          backgroundColor: parsed,
          baseBackgroundColor: parsed,
          backgroundErrorMessage: '',
        };
      }
      if (backgroundInput.trim() === '') {
        return {
          backgroundColor: colord(defaultBackgroundColor),
          baseBackgroundColor: colord(defaultBackgroundColor),
          backgroundErrorMessage: '',
        };
      }
      return {
        backgroundColor: colord(defaultBackgroundColor),
        baseBackgroundColor: colord(defaultBackgroundColor),
        backgroundErrorMessage: 'Invalid color format',
      };
    }, [backgroundInput]);

  const handleTextInputChange = useCallback((value: string) => {
    setTextInput(value);
  }, []);

  const handleBackgroundInputChange = useCallback((value: string) => {
    setBgInput(value);
  }, []);

  const handleTextColorPickerChange = useCallback((newColor: Colord) => {
    setTextInput(newColor.toHex());
  }, []);

  const handleBackgroundColorPickerChange = useCallback((newColor: Colord) => {
    setBgInput(newColor.toHex());
  }, []);

  const handleSwap = useCallback(() => {
    const tempInput = textInput;
    setTextInput(backgroundInput);
    setBgInput(tempInput);
  }, [textInput, backgroundInput]);

  const contrast = textColor.contrast(backgroundColor);

  return (
    <Screen className="grid-rows-[2fr_1fr] gap-8">
      <div className="grid h-full grid-cols-2 gap-4">
        <Panel accessibleLabel="Text color" fullHeight>
          <div className="flex h-full flex-col gap-4">
            <Input
              id="text-color"
              label="Text color"
              type="text"
              value={textInput}
              onChange={(e) => handleTextInputChange(e.target.value)}
              errorMessage={textErrorMessage}
              actions={<Button onClick={handleSwap}>Swap colors</Button>}
            />
            <ColorPickerWithPreview
              label="Text color picker"
              color={textColor}
              baseColor={baseTextColor}
              onChange={handleTextColorPickerChange}
              showAlpha={false}
            />
          </div>
        </Panel>
        <Panel accessibleLabel="Background color" fullHeight>
          <div className="flex h-full flex-col gap-4">
            <Input
              id="background-color"
              label="Background color"
              type="text"
              value={backgroundInput}
              onChange={(e) => handleBackgroundInputChange(e.target.value)}
              errorMessage={backgroundErrorMessage}
            />
            <ColorPickerWithPreview
              label="Background color picker"
              color={backgroundColor}
              baseColor={baseBackgroundColor}
              onChange={handleBackgroundColorPickerChange}
              showAlpha={false}
            />
          </div>
        </Panel>
      </div>
      <Panel accessibleLabel="Results">
        <div className="grid grid-cols-4 gap-4">
          <ContrastRatio ratio={contrast} />
          <ContrastResult
            label="Normal text (< 24px)"
            hint="Required contrast ratio AA: 4.5, AAA: 7.0"
            preview={textPreview}
            ratio={contrast}
            isLargeText={false}
            textColor={textColor.toHex()}
            backgroundColor={backgroundColor.toHex()}
          />
          <ContrastResult
            label="Large text (≥ 24px)"
            hint="Required contrast ratio AA: 3.0, AAA: 4.5"
            preview={textPreview}
            ratio={contrast}
            isLargeText
            textColor={textColor.toHex()}
            backgroundColor={backgroundColor.toHex()}
          />
          <ContrastResult
            label="Icons"
            hint="Required contrast ratio AA: 3.0, AAA: 4.5"
            preview={
              <div className="flex flex-row gap-1">
                <Icon icon="search" className="size-7" />
                <Icon icon="fish" className="size-7" />
                <Icon icon="sidebar" className="size-7" />
              </div>
            }
            ratio={contrast}
            isLargeText
            textColor={textColor.toHex()}
            backgroundColor={backgroundColor.toHex()}
          />
        </div>
      </Panel>
    </Screen>
  );
}
