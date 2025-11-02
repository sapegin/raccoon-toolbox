import { Flex } from './Flex';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { tools } from '../tools';
import { NavigationButton } from './NavigationButton';
import { Box } from './Box';
import { getModifierKey } from '../util/getModifierKey';

export function Sidebar({
  onClose,
  show,
}: {
  onClose?: () => void;
  show?: boolean;
}) {
  const modifierKey = getModifierKey();
  return (
    <Box
      overflowX="hidden"
      transition="width 0.08s ease-in-out"
      height="100%"
      width={show ? '16rem' : 0}
      inert={show === false}
      aria-hidden={show === false}
    >
      <Stack
        width="16rem"
        height="100%"
        gap="xs"
        padding="s"
        borderStyle="solid"
        borderWidth="0 1px 0 0"
        borderColor="lightBorder"
        overflowY="auto"
        backgroundColor="uiBackground"
      >
        <Flex justifyContent="flex-end" mb="xs">
          <IconButton
            label={`Close sidebar (${modifierKey}+/)`}
            onClick={onClose}
          >
            <Icon icon="sidebar" />
          </IconButton>
        </Flex>
        <Stack as="ul" gap="xs">
          {tools.map((tool) => (
            <li key={tool.id}>
              <NavigationButton to={`/${tool.id}`}>
                {tool.name}
              </NavigationButton>
            </li>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
