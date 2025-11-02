import { Flex } from './Flex';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { tools } from '../tools';
import { NavigationButton } from './NavigationButton';

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <Stack
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
          onClick={onClose}
          title="Close sidebar (Cmd+/)"
          aria-label="Close sidebar (Cmd+/)"
        >
          <Icon icon="sidebar" />
        </IconButton>
      </Flex>
      <Stack as="ul" gap="xs">
        {tools.map((tool) => (
          <li key={tool.id}>
            <NavigationButton to={`/${tool.id}`}>{tool.name}</NavigationButton>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
