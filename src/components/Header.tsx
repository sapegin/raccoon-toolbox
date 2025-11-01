import { Grid } from './Grid';
import { Text } from './Text';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

export function Header({
  title = 'Raccoon Toolbox',
  onOpen,
}: {
  title?: string;
  onOpen: () => void;
}) {
  return (
    <Grid
      gridTemplateColumns="2rem auto 2rem"
      gap="m"
      p="xs"
      borderStyle="solid"
      borderBottomWidth="1px"
      borderColor="lightBorder"
      backgroundColor="uiBackground"
    >
      <IconButton
        onClick={onOpen}
        title="Open sidebar"
        aria-label="Open sidebar"
      >
        <Icon icon="menu" />
      </IconButton>
      <Text as="h2" textAlign="center">
        {title}
      </Text>
      <div />
    </Grid>
  );
}
