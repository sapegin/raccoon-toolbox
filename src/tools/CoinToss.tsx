import { useCallback, useState } from 'react';
import { Button } from '../components/Button';
import { LargeValue } from '../components/LargeValue';
import { Screen } from '../components/Screen';

type TossResult = 'heads' | 'tails';

/**
 * Returns a fair, unbiased coin toss using the Web Crypto API. Math.random() is
 * implementation-defined and may have weak distribution.
 * crypto.getRandomValues() yields uniform random bits, so the lowest bit is an
 * unbiased fair coin.
 */
function tossCoin(): TossResult {
  const buffer = new Uint8Array(1);
  crypto.getRandomValues(buffer);
  return (buffer[0] & 1) === 0 ? 'heads' : 'tails';
}

export function CoinToss() {
  const [lastResult, setLastResult] = useState<TossResult | undefined>();
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const handleToss = useCallback(() => {
    const result = tossCoin();
    setLastResult(result);
    if (result === 'heads') {
      setHeadsCount((count) => count + 1);
    } else {
      setTailsCount((count) => count + 1);
    }
  }, []);

  const handleReset = useCallback(() => {
    setLastResult(undefined);
    setHeadsCount(0);
    setTailsCount(0);
  }, []);

  const total = headsCount + tailsCount;

  return (
    <Screen>
      <div className="flex h-full flex-col items-center justify-center gap-16">
        <p className="text-center typo-xlarge">
          {lastResult ? (
            <span className="capitalize">{lastResult}</span>
          ) : (
            'Toss the coin'
          )}
        </p>
        <Button size="large" onClick={handleToss}>
          Toss coin
        </Button>
        <div className="flex flex-col gap-8">
          <dl className="grid grid-cols-3 gap-4 text-center">
            <LargeValue label="Heads" value={headsCount} />
            <LargeValue label="Tails" value={tailsCount} />
            <LargeValue label="Total" value={total} />
          </dl>
          <div className="text-center">
            <Button onClick={handleReset} disabled={total === 0}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
