import { type ChangeEvent, useCallback, useState } from 'react';
import { Stack } from '../../styled-system/jsx';
import { Input } from '../components/Input';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';
import { usePersistentState } from '../hooks/usePersistentState';

type Base = 'binary' | 'octal' | 'decimal' | 'hexadecimal';

const baseRadix: Record<Base, number> = {
  binary: 2,
  octal: 8,
  decimal: 10,
  hexadecimal: 16,
};

const baseLabels: Record<Base, string> = {
  binary: 'Binary (base 2)',
  octal: 'Octal (base 8)',
  decimal: 'Decimal (base 10)',
  hexadecimal: 'Hexadecimal (base 16)',
};

export function NumberBases() {
  // Persist only one value, as the rest can be calculated based on it
  const [decimal, setDecimal] = usePersistentState('numberBases.decimal', '');

  const decimalInt = Number.parseInt(decimal, 10);
  const [binary, setBinary] = useState(decimal ? decimalInt.toString(2) : '');
  const [octal, setOctal] = useState(decimal ? decimalInt.toString(8) : '');
  const [hexadecimal, setHexadecimal] = useState(
    decimal ? decimalInt.toString(16).toUpperCase() : ''
  );

  const updateAllFields = useCallback(
    (value: number) => {
      setBinary(value.toString(2));
      setOctal(value.toString(8));
      setDecimal(value.toString(10));
      setHexadecimal(value.toString(16).toUpperCase());
      setDecimal(value.toString(10));
    },
    [setDecimal]
  );

  const handleChange = useCallback(
    (base: Base) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value === '') {
        setBinary('');
        setOctal('');
        setDecimal('');
        setHexadecimal('');
        setDecimal('');
        return;
      }

      const radix = baseRadix[base];
      const number = Number.parseInt(value, radix);

      if (Number.isNaN(number) || number < 0) {
        // Swallow errors: ignore invalid characters
        return;
      }

      updateAllFields(number);
    },
    [updateAllFields, setDecimal]
  );

  return (
    <Screen>
      <Panel label="Number base converter" fullHeight>
        <Stack gap="m">
          <Text>
            Enter a number into any of the text fields — the rest will be
            automatically calculated.
          </Text>
          <Input
            id="binary"
            label={baseLabels.binary}
            value={binary}
            onChange={handleChange('binary')}
          />
          <Input
            id="octal"
            label={baseLabels.octal}
            value={octal}
            onChange={handleChange('octal')}
          />
          <Input
            id="decimal"
            label={baseLabels.decimal}
            value={decimal}
            onChange={handleChange('decimal')}
          />
          <Input
            id="hexadecimal"
            label={baseLabels.hexadecimal}
            value={hexadecimal}
            onChange={handleChange('hexadecimal')}
          />
        </Stack>
      </Panel>
    </Screen>
  );
}
