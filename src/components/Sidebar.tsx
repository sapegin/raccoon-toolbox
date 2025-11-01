import { Flex } from './Flex';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Stack } from './Stack';
import { tools } from '../tools';
import { NavigationButton } from './NavigationButton';

export function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <Stack
      gap="xs"
      padding="s"
      borderRight="1px solid"
      borderColor="lightBorder"
      overflowY="auto"
      backgroundColor="uiBackground"
    >
      <Flex justifyContent="flex-end" mb="xs">
        <IconButton
          onClick={onClose}
          title="Close sidebar"
          aria-label="Close sidebar"
        >
          <Icon icon="menu" />
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
