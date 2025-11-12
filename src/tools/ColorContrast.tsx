import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { colord, type Colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import { Button } from '../components/Button';
import { usePersistentState } from '../hooks/usePersistentState';
import { Stack, Grid, Flex, VisuallyHidden } from '../../styled-system/jsx';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { ColorPickerWithPreview } from '../components/ColorPickerWithPreview';
import { Text } from '../components/Text';
import { parseColorInput } from '../util/parseColorInput';
import { Panel } from '../components/Panel';
import { Icon } from '../components/Icon';

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
    return 'errorForeground';
  }

  const levelNormalText = getContrastLevel(ratio, false);
  if (levelNormalText === 'Fail') {
    return 'warningForeground';
  }

  return 'activeForeground';
}

function ContrastRatio({ ratio }: { ratio: number }) {
  return (
    <Stack gap="s" alignItems="center">
      <output htmlFor="text-color background-color">
        <Flex height="5.5rem" alignItems="center">
          <Text variant="xlarge" color={getContrastLabelColor(ratio)}>
            <VisuallyHidden>Contrast ratio: </VisuallyHidden>
            {ratio.toFixed(2)}:1
          </Text>
        </Flex>
      </output>
      <Text aria-hidden>Contrast ratio</Text>
    </Stack>
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
    <Stack gap="s" alignItems="center">
      <Flex
        width="100%"
        height="5.5rem"
        padding="s"
        alignItems="center"
        justifyContent="center"
        borderRadius="input"
        border="1px solid"
        textAlign="center"
        overflow="hidden"
        fontSize={isLargeText ? '24px' : '16px'}
        lineHeight={isLargeText ? '28px' : '22px'}
        borderColor={passes ? 'lightBorder' : 'errorForeground'}
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        {preview}
      </Flex>
      <Flex width="100%" justifyContent="space-between" title={hint}>
        <Text>{label}</Text>
        <Flex
          as="span"
          alignItems="center"
          fontWeight="bold"
          color={passes ? 'successForeground' : 'errorForeground'}
        >
          <Icon icon={passes ? 'check' : 'xmark'} />
          {passes ? level : 'Fail'}
        </Flex>
      </Flex>
    </Stack>
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

  const [textColor, setTextColor] = useState<Colord>(() => {
    const parsed = parseColorInput(textInput);
    return parsed ?? colord(defaultTextColor);
  });
  const [backgroundColor, setBackgroundColor] = useState<Colord>(() => {
    const parsed = parseColorInput(backgroundInput);
    return parsed ?? colord(defaultBackgroundColor);
  });

  const [baseTextColor, setBaseTextColor] = useState<Colord>(textColor);
  const [baseBackgroundColor, setBaseBackgroundColor] =
    useState<Colord>(backgroundColor);

  const [textErrorMessage, setTextErrorMessage] = useState('');
  const [bgErrorMessage, setBackgroundErrorMessage] = useState('');

  useEffect(() => {
    if (textInput !== '') {
      handleTextInputChange(textInput);
    }
    if (backgroundInput !== '') {
      handleBackgroundInputChange(backgroundInput);
    }
  }, []);

  const handleTextInputChange = useCallback((value: string) => {
    setTextInput(value);
    const parsed = parseColorInput(value);
    if (parsed) {
      setTextColor(parsed);
      setBaseTextColor(parsed);
      setTextErrorMessage('');
    } else if (value.trim() === '') {
      setTextErrorMessage('');
    } else {
      setTextErrorMessage('Invalid color format');
    }
  }, []);

  const handleBackgroundInputChange = useCallback((value: string) => {
    setBgInput(value);
    const parsed = parseColorInput(value);
    if (parsed) {
      setBackgroundColor(parsed);
      setBaseBackgroundColor(parsed);
      setBackgroundErrorMessage('');
    } else if (value.trim() === '') {
      setBackgroundErrorMessage('');
    } else {
      setBackgroundErrorMessage('Invalid color format');
    }
  }, []);

  const handleTextColorPickerChange = useCallback((newColor: Colord) => {
    setTextColor(newColor);
    setTextInput(newColor.toHex());
    setTextErrorMessage('');
  }, []);

  const handleBackgroundColorPickerChange = useCallback((newColor: Colord) => {
    setBackgroundColor(newColor);
    setBgInput(newColor.toHex());
    setBackgroundErrorMessage('');
  }, []);

  const handleSwap = useCallback(() => {
    const tempInput = textInput;
    const tempColor = textColor;
    const tempBaseColor = baseTextColor;

    setTextInput(backgroundInput);
    setTextColor(backgroundColor);
    setBaseTextColor(baseBackgroundColor);

    setBgInput(tempInput);
    setBackgroundColor(tempColor);
    setBaseBackgroundColor(tempBaseColor);

    setTextErrorMessage('');
    setBackgroundErrorMessage('');
  }, [
    textInput,
    textColor,
    baseTextColor,
    backgroundInput,
    backgroundColor,
    baseBackgroundColor,
  ]);

  const contrast = textColor.contrast(backgroundColor);

  return (
    <Screen gridTemplateRows="2fr 1fr" gap="l">
      <Grid gridTemplateColumns="1fr 1fr" gap="m">
        <Panel accessibleLabel="Text color" fullHeight>
          <Stack gap="m" height="100%">
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
            />
          </Stack>
        </Panel>
        <Panel accessibleLabel="Background color" fullHeight>
          <Stack gap="m" height="100%">
            <Input
              id="background-color"
              label="Background color"
              type="text"
              value={backgroundInput}
              onChange={(e) => handleBackgroundInputChange(e.target.value)}
              errorMessage={bgErrorMessage}
            />
            <ColorPickerWithPreview
              label="Background color picker"
              color={backgroundColor}
              baseColor={baseBackgroundColor}
              onChange={handleBackgroundColorPickerChange}
            />
          </Stack>
        </Panel>
      </Grid>
      <Panel accessibleLabel="Results">
        <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="m">
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
              <Stack direction="row" gap="xs">
                <Icon icon="search" size={28} />
                <Icon icon="fish" size={28} />
                <Icon icon="sidebar" size={28} />
              </Stack>
            }
            ratio={contrast}
            isLargeText
            textColor={textColor.toHex()}
            backgroundColor={backgroundColor.toHex()}
          />
        </Grid>
      </Panel>
    </Screen>
  );
}
