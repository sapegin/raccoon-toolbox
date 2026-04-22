import { type ChangeEvent, useCallback, useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LargeValue } from '../components/LargeValue';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

const MILLISECONDS_PER_DAY = 86_400_000;

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(
    ((d.getTime() - yearStart.getTime()) / MILLISECONDS_PER_DAY + 1) / 7
  );
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / MILLISECONDS_PER_DAY);
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = date.getTime() - now;
  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(seconds) < 60) {
    return rtf.format(seconds, 'second');
  }
  if (Math.abs(minutes) < 60) {
    return rtf.format(minutes, 'minute');
  }
  if (Math.abs(hours) < 24) {
    return rtf.format(hours, 'hour');
  }
  if (Math.abs(days) < 7) {
    return rtf.format(days, 'day');
  }
  if (Math.abs(weeks) < 4) {
    return rtf.format(weeks, 'week');
  }
  if (Math.abs(months) < 12) {
    return rtf.format(months, 'month');
  }
  return rtf.format(years, 'year');
}

export function DateConverter() {
  const [timestamp, setTimestamp] = usePersistentState(
    'dateConverter.timestamp',
    String(Date.now())
  );

  const timestampNum = Number.parseInt(timestamp, 10) || Date.now();
  const date = new Date(timestampNum);

  const [isoInput, setIsoInput] = useState(date.toISOString());
  const [prevTimestampNum, setPrevTimestampNum] = useState(timestampNum);

  if (timestampNum !== prevTimestampNum) {
    setPrevTimestampNum(timestampNum);
    setIsoInput(new Date(timestampNum).toISOString());
  }

  const handleTimestampChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTimestamp(value);
    },
    [setTimestamp]
  );

  const handleUnixTimeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const seconds = Number.parseInt(value, 10);
      if (Number.isNaN(seconds) === false) {
        setTimestamp(String(seconds * 1000));
      }
    },
    [setTimestamp]
  );

  const handleIsoChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setIsoInput(value);
      try {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime()) === false) {
          setTimestamp(String(parsed.getTime()));
        }
      } catch {
        // Invalid ISO string, keep local buffer only
      }
    },
    [setTimestamp]
  );

  const handleIsoBlur = useCallback(() => {
    setIsoInput(date.toISOString());
  }, [date]);

  const handleYearChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (Number.isNaN(value) === false) {
        const newDate = new Date(date);
        newDate.setFullYear(value);
        setTimestamp(String(newDate.getTime()));
      }
    },
    [date, setTimestamp]
  );

  const handleMonthChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (Number.isNaN(value) === false) {
        const newDate = new Date(date);
        newDate.setMonth(value - 1);
        setTimestamp(String(newDate.getTime()));
      }
    },
    [date, setTimestamp]
  );

  const handleDayChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (Number.isNaN(value) === false) {
        const newDate = new Date(date);
        newDate.setDate(value);
        setTimestamp(String(newDate.getTime()));
      }
    },
    [date, setTimestamp]
  );

  const handleHourChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (Number.isNaN(value) === false) {
        const newDate = new Date(date);
        newDate.setHours(value);
        setTimestamp(String(newDate.getTime()));
      }
    },
    [date, setTimestamp]
  );

  const handleMinuteChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (Number.isNaN(value) === false) {
        const newDate = new Date(date);
        newDate.setMinutes(value);
        setTimestamp(String(newDate.getTime()));
      }
    },
    [date, setTimestamp]
  );

  const handleSecondChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      if (Number.isNaN(value) === false) {
        const newDate = new Date(date);
        newDate.setSeconds(value);
        setTimestamp(String(newDate.getTime()));
      }
    },
    [date, setTimestamp]
  );

  const handleNowClick = useCallback(() => {
    setTimestamp(String(Date.now()));
  }, [setTimestamp]);

  const humanReadable = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dayOfYear = getDayOfYear(date);
  const weekNumber = getWeekNumber(date);
  const leapYear = isLeapYear(date.getFullYear());
  const relativeTime = getRelativeTime(date);

  return (
    <Screen className="grid-cols-2">
      <Panel title="Date and time">
        <div className="flex flex-col gap-4">
          <Input
            id="timestamp"
            label="Timestamp (milliseconds)"
            type="number"
            value={timestamp}
            onChange={handleTimestampChange}
            actions={<Button onClick={handleNowClick}>Now</Button>}
          />
          <Input
            id="unix-time"
            label="Unix time (seconds)"
            type="number"
            value={String(Math.floor(timestampNum / 1000))}
            onChange={handleUnixTimeChange}
          />
          <Input
            id="iso8601"
            label="ISO 8601"
            type="text"
            value={isoInput}
            onChange={handleIsoChange}
            onBlur={handleIsoBlur}
          />
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
          >
            <Input
              id="year"
              label="Year"
              type="number"
              value={String(date.getFullYear())}
              onChange={handleYearChange}
            />
            <Input
              id="month"
              label="Month"
              type="number"
              value={String(date.getMonth() + 1)}
              onChange={handleMonthChange}
            />
            <Input
              id="day"
              label="Day"
              type="number"
              value={String(date.getDate())}
              onChange={handleDayChange}
            />
            <Input
              id="hour"
              label="Hour"
              type="number"
              value={String(date.getHours())}
              onChange={handleHourChange}
            />
            <Input
              id="minute"
              label="Minute"
              type="number"
              value={String(date.getMinutes())}
              onChange={handleMinuteChange}
            />
            <Input
              id="second"
              label="Second"
              type="number"
              value={String(date.getSeconds())}
              onChange={handleSecondChange}
            />
          </div>
        </div>
      </Panel>
      <Panel title="Date preview">
        <div className="flex flex-col gap-4">
          <LargeValue label="Date" value={humanReadable} />
          <div className="flex flex-col gap-1">
            <dt className="typo-small text-[color:var(--color-secondary-text-foreground)]">
              Day of year
            </dt>
            <dd className="typo-body">{dayOfYear}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="typo-small text-[color:var(--color-secondary-text-foreground)]">
              Week number
            </dt>
            <dd className="typo-body">{weekNumber}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="typo-small text-[color:var(--color-secondary-text-foreground)]">
              Leap year
            </dt>
            <dd className="typo-body">{leapYear ? 'Yes' : 'No'}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="typo-small text-[color:var(--color-secondary-text-foreground)]">
              Relative time
            </dt>
            <dd className="typo-body">{relativeTime}</dd>
          </div>
        </div>
      </Panel>
    </Screen>
  );
}
