import clsx from 'clsx';
import { APP_NAME } from '../constants';
import { getShortcut } from '../util/getShortcut';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

export function Header({
  title = APP_NAME,
  onOpen,
  show,
}: {
  title?: string;
  onOpen?: () => void;
  show?: boolean;
}) {
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
        className="
          grid grid-cols-[2rem_auto_2rem] gap-4 border-b border-solid
          border-light-border bg-ui-background p-1
        "
      >
        <div className="flex items-center justify-center">
          <IconButton
            label={`Open sidebar (${getShortcut('/')})`}
            onClick={onOpen}
            className="-mb-0.5"
          >
            <Icon icon="sidebar" className="size-5.5" />
          </IconButton>
        </div>
        <h2 className="text-center typo-body">{title}</h2>
        <div />
      </div>
    </div>
  );
}
