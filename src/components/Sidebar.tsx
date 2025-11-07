import { Flex } from './Flex';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { tools } from '../tools';
import { NavigationButton } from './NavigationButton';
import { SidebarLink } from './SidebarLink';
import { Box } from './Box';
import { Grid, VisuallyHidden } from '../../styled-system/jsx';
import { getShortcut } from '../util/getShortcut';
import { SearchButton } from './SearchButton';
import { isTauri } from '@tauri-apps/api/core';

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
    <Box
      overflowX="hidden"
      transition="width 0.08s ease-in-out"
      height="100%"
      width={show ? '16rem' : 0}
      inert={show === false}
      aria-hidden={show === false}
      suppressHydrationWarning
    >
      <VisuallyHidden as="h2">Tools</VisuallyHidden>
      <Stack
        width="16rem"
        height="100%"
        borderStyle="solid"
        borderWidth="0 1px 0 0"
        borderColor="lightBorder"
        backgroundColor="uiBackground"
      >
        <Flex justifyContent="space-between" gap="s" pt="s" pb="xs" px="s">
          <SearchButton type="button" onClick={onSearchOpen}>
            <Icon icon="search" size={18} />
            Search
            <Box as="kbd" ml="auto" fontSize="xs" color="disabledForeground">
              {getShortcut('K')}
            </Box>
          </SearchButton>
          <Flex alignItems="center" justifyContent="center">
            <IconButton
              label={`Close sidebar (${getShortcut('/')})`}
              onClick={onClose}
            >
              <Icon icon="sidebar" />
            </IconButton>
          </Flex>
        </Flex>
        <Stack as="ul" gap="xs" p="xs" overflowY="auto">
          {tools.map((tool) => (
            <li key={tool.id}>
              <NavigationButton to={`/${tool.id}/`}>
                {tool.name}
              </NavigationButton>
            </li>
          ))}
        </Stack>
        {isTauri() === false && (
          <Grid
            gridTemplateColumns="1fr 1fr"
            mt="auto"
            p="xs"
            borderWidth="1px 0 0 0"
            borderStyle="solid"
            borderColor="lightBorder"
          >
            <Box>
              <SidebarLink onClick={onHotkeysOpen}>Hotkeys</SidebarLink>
            </Box>
            <SidebarLink href="https://github.com/sapegin/raccoon-toolbox/issues">
              Report issue
            </SidebarLink>
            <SidebarLink href="https://buymeacoffee.com/sapegin">
              Buy me coffee
            </SidebarLink>
            <SidebarLink href="https://sapegin.me/book/">
              Read my book
            </SidebarLink>
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
