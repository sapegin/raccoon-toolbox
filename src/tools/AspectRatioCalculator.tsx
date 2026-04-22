import { useCallback, useMemo } from 'react';
import { Input } from '../components/Input';
import { LargeValue } from '../components/LargeValue';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

const defaultWidth = 1920;
const defaultHeight = 1080;
const defaultRatioWidth = 16;
const defaultRatioHeight = 9;

/**
 * Calculates the greatest common divisor (GCD) of two numbers using the
 * Euclidean algorithm. The GCD is the largest positive integer that divides
 * both numbers without a remainder.
 *
 * @param a - The first number
 * @param b - The second number
 */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function calculateAspectRatio(width: number, height: number) {
  if (width === 0 || height === 0) {
    return { ratioWidth: 0, ratioHeight: 0, decimal: 0 };
  }

  const divisor = gcd(width, height);
  const ratioWidth = width / divisor;
  const ratioHeight = height / divisor;
  const decimal = width / height;

  return { ratioWidth, ratioHeight, decimal };
}

function calculateDimensions(
  aspectRatioWidth: number,
  aspectRatioHeight: number,
  width: number,
  height: number
) {
  if (aspectRatioWidth === 0 || aspectRatioHeight === 0) {
    return { calculatedWidth: 0, calculatedHeight: 0 };
  }

  const aspectRatio = aspectRatioWidth / aspectRatioHeight;

  if (width > 0 && height === 0) {
    return {
      calculatedWidth: width,
      calculatedHeight: Math.round(width / aspectRatio),
    };
  }

  if (height > 0 && width === 0) {
    return {
      calculatedWidth: Math.round(height * aspectRatio),
      calculatedHeight: height,
    };
  }

  return { calculatedWidth: width, calculatedHeight: height };
}

export function AspectRatioCalculator() {
  const [width, setWidth] = usePersistentState(
    'aspectRatio.width',
    defaultWidth.toString()
  );
  const [height, setHeight] = usePersistentState(
    'aspectRatio.height',
    defaultHeight.toString()
  );
  const [aspectRatioWidth, setAspectRatioWidth] = usePersistentState(
    'aspectRatio.ratioWidth',
    defaultRatioWidth.toString()
  );
  const [aspectRatioHeight, setAspectRatioHeight] = usePersistentState(
    'aspectRatio.ratioHeight',
    defaultRatioHeight.toString()
  );
  const [dimensionWidth, setDimensionWidth] = usePersistentState(
    'aspectRatio.dimWidth',
    defaultWidth.toString()
  );
  const [dimensionHeight, setDimensionHeight] = usePersistentState(
    'aspectRatio.dimHeight',
    ''
  );

  const calculatedRatio = useMemo(() => {
    const w = Number.parseInt(width, 10) || 0;
    const h = Number.parseInt(height, 10) || 0;
    return calculateAspectRatio(w, h);
  }, [width, height]);

  const calculatedDimensions = useMemo(() => {
    const arw = Number.parseInt(aspectRatioWidth, 10) || 0;
    const arh = Number.parseInt(aspectRatioHeight, 10) || 0;
    const w = Number.parseInt(dimensionWidth, 10) || 0;
    const h = Number.parseInt(dimensionHeight, 10) || 0;
    return calculateDimensions(arw, arh, w, h);
  }, [aspectRatioWidth, aspectRatioHeight, dimensionWidth, dimensionHeight]);

  const handleWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setWidth(e.target.value);
    },
    [setWidth]
  );

  const handleHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHeight(e.target.value);
    },
    [setHeight]
  );

  const handleAspectRatioWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAspectRatioWidth(e.target.value);
    },
    [setAspectRatioWidth]
  );

  const handleAspectRatioHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAspectRatioHeight(e.target.value);
    },
    [setAspectRatioHeight]
  );

  const handleDimensionWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDimensionWidth(e.target.value);
    },
    [setDimensionWidth]
  );

  const handleDimensionHeightChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDimensionHeight(e.target.value);
    },
    [setDimensionHeight]
  );

  return (
    <Screen className="grid-cols-2 gap-4">
      <Panel label="Calculate aspect ratio" fullHeight>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="width"
              label="Width"
              type="number"
              value={width}
              onChange={handleWidthChange}
            />
            <Input
              id="height"
              label="Height"
              type="number"
              value={height}
              onChange={handleHeightChange}
            />
          </div>
          <dl className="flex flex-row gap-4">
            <LargeValue
              label="Aspect ratio"
              value={`${calculatedRatio.ratioWidth}:${calculatedRatio.ratioHeight}`}
            />
            <LargeValue
              label="CSS format"
              value={`${calculatedRatio.ratioWidth}/${calculatedRatio.ratioHeight}`}
            />
            <LargeValue
              label="Decimal"
              value={calculatedRatio.decimal.toFixed(2)}
            />
          </dl>
        </div>
      </Panel>
      <Panel label="Calculate dimensions" fullHeight>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="aspect-ratio-width"
              label="Aspect ratio width"
              type="number"
              value={aspectRatioWidth}
              onChange={handleAspectRatioWidthChange}
            />
            <Input
              id="aspect-ratio-height"
              label="Aspect ratio height"
              type="number"
              value={aspectRatioHeight}
              onChange={handleAspectRatioHeightChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="dimension-width"
              label="Width"
              type="number"
              value={dimensionWidth}
              onChange={handleDimensionWidthChange}
            />
            <Input
              id="dimension-height"
              label="Height"
              type="number"
              value={dimensionHeight}
              onChange={handleDimensionHeightChange}
            />
          </div>
          <dl className="flex flex-row gap-4">
            <LargeValue
              label="Width"
              value={calculatedDimensions.calculatedWidth}
            />
            <LargeValue
              label="Height"
              value={calculatedDimensions.calculatedHeight}
            />
          </dl>
        </div>
      </Panel>
    </Screen>
  );
}
