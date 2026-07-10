import { isTauri } from '@tauri-apps/api/core';
import clsx from 'clsx';
import { APP_NAME } from '../constants';
import { getShortcut } from '../util/getShortcut';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

export function Header({
  title = APP_NAME,
  onOpen,
  show,
  showOpenButton = true,
}: {
  title?: string;
  onOpen?: () => void;
  show?: boolean;
  showOpenButton?: boolean;
}) {
  const draggable = isTauri();

  return (
    <div
      className={clsx(
        'overflow-y-hidden transition-[height] duration-[0.08s] ease-in-out',
        show ? 'h-[2.39rem]' : 'h-0'
      )}
      inert={show === false}
      aria-hidden={show === false}
      suppressHydrationWarning
    >
      <div
        className={clsx(
          'border-border bg-secondary-ui-background border-b-hair border-solid p-1',
          showOpenButton
            ? 'grid grid-cols-[2rem_auto_2rem] gap-4'
            : 'flex h-full items-center justify-center'
        )}
        data-tauri-drag-region={draggable ? true : undefined}
      >
        {showOpenButton && (
          <>
            <div className="flex items-center justify-center">
              <IconButton
                label={`Open sidebar (${getShortcut('[')})`}
                onClick={onOpen}
                className="-mb-0.5"
              >
                <Icon icon="sidebar" className="size-5.5" />
              </IconButton>
            </div>
            <h2 className="typo-body text-center">{title}</h2>
            <div />
          </>
        )}
        {showOpenButton === false && (
          <h2 className="typo-body text-center">{title}</h2>
        )}
      </div>
    </div>
  );
}
