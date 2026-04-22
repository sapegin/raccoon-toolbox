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
      className="
        overflow-y-hidden transition-[height] duration-[0.08s] ease-in-out
      "
      inert={show === false}
      aria-hidden={show === false}
      // TODO: Move to a theme variable? Use calc(header height + 1px)?
      style={{ height: show ? '2.38rem' : 0 }}
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
          >
            <Icon icon="sidebar" />
          </IconButton>
        </div>
        <h2 className="typo-body text-center">
          {title}
        </h2>
        <div />
      </div>
    </div>
  );
}
