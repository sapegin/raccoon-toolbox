import { type Colord, colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import { type ReactNode, useCallback, useMemo } from 'react';
import { Flex, Grid, Stack, VisuallyHidden } from '../../styled-system/jsx';
import { Button } from '../components/Button';
import { ColorPickerWithPreview } from '../components/ColorPickerWithPreview';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';
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
              showAlpha={false}
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
              errorMessage={backgroundErrorMessage}
            />
            <ColorPickerWithPreview
              label="Background color picker"
              color={backgroundColor}
              baseColor={baseBackgroundColor}
              onChange={handleBackgroundColorPickerChange}
              showAlpha={false}
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
