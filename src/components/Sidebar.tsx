import { Flex } from './Flex';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { tools } from '../tools';
import { NavigationButton } from './NavigationButton';
import { Box } from './Box';
import { VisuallyHidden } from '../../styled-system/jsx';
import { getShortcut } from '../util/getShortcut';
import { SearchButton } from './SearchButton';
export function Sidebar({
  onClose,
  onSearchOpen,
  show,
}: {
  onClose?: () => void;
  onSearchOpen?: () => void;
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
        gap="m"
        padding="s"
        borderStyle="solid"
        borderWidth="0 1px 0 0"
        borderColor="lightBorder"
        overflowY="auto"
        backgroundColor="uiBackground"
      >
        <Flex justifyContent="space-between" gap="s">
          <SearchButton type="button" onClick={onSearchOpen}>
            <Icon icon="search" size={18} />
            Search
            <Box as="kbd" ml="auto" fontSize="xs" color="disabledForeground">
              {getShortcut('K')}
            </Box>
          </SearchButton>
          <IconButton
            label={`Close sidebar (${getShortcut('/')})`}
            onClick={onClose}
          >
            <Icon icon="sidebar" />
          </IconButton>
        </Flex>
        <Stack as="ul" gap="xs">
          {tools.map((tool) => (
            <li key={tool.id}>
              <NavigationButton to={`/${tool.id}/`}>
                {tool.name}
              </NavigationButton>
            </li>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
