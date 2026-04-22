import { isTauri } from '@tauri-apps/api/core';
import clsx from 'clsx';
import { tools } from '../tools';
import { getShortcut } from '../util/getShortcut';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { NavigationButton } from './NavigationButton';
import { SearchButton } from './SearchButton';
import { SidebarLink } from './SidebarLink';

export function Sidebar({
  onClose,
  onSearchOpen,
  onHotkeysOpen,
  show,
}: {
  onClose?: () => void;
  onSearchOpen?: () => void;
  onHotkeysOpen?: () => void;
  show?: boolean;
}) {
  return (
    <div
      className={clsx(
        `
          h-full overflow-x-hidden transition-[width] duration-[0.08s]
          ease-in-out
        `,
        show ? 'w-64' : 'w-0'
      )}
      inert={show === false}
      aria-hidden={show === false}
      suppressHydrationWarning
    >
      <h2 className="sr-only">Tools</h2>
      <div
        className="
          flex h-full w-64 flex-col border-r border-solid border-light-border
          bg-ui-background
        "
      >
        <div className="flex justify-between gap-2 px-2 pt-2 pb-1">
          <SearchButton type="button" onClick={onSearchOpen}>
            <Icon icon="search" size={18} />
            Search
            <kbd className="ml-auto text-xs text-disabled-foreground">
              {getShortcut('K')}
            </kbd>
          </SearchButton>
          <div className="flex items-center justify-center">
            <IconButton
              label={`Close sidebar (${getShortcut('/')})`}
              onClick={onClose}
            >
              <Icon icon="sidebar" />
            </IconButton>
          </div>
        </div>
        <ul className="flex flex-col gap-1 overflow-y-auto p-1">
          {tools.map((tool) => (
            <li key={tool.id}>
              <NavigationButton to={`/${tool.id}/`}>
                {tool.name}
              </NavigationButton>
            </li>
          ))}
        </ul>
        {isTauri() === false && (
          <div
            className="
              mt-auto grid grid-cols-2 border-t border-solid border-light-border
              p-1
            "
          >
            <div>
              <SidebarLink onClick={onHotkeysOpen}>Hotkeys</SidebarLink>
            </div>
            <SidebarLink href="https://github.com/sapegin/raccoon-toolbox/issues">
              Report issue
            </SidebarLink>
            <SidebarLink href="https://buymeacoffee.com/sapegin">
              Buy me coffee
            </SidebarLink>
            <SidebarLink href="https://sapegin.me/book/">
              Read my book
            </SidebarLink>
          </div>
        )}
      </div>
    </div>
  );
}
