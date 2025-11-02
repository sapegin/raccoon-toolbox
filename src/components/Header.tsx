import { Grid } from './Grid';
import { Text } from './Text';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { APP_NAME } from '../constants';

export function Header({
  title = APP_NAME,
  onOpen,
}: {
  title?: string;
  onOpen?: () => void;
}) {
  return (
    <Grid
      gridTemplateColumns="2rem auto 2rem"
      gap="m"
      p="xs"
      borderStyle="solid"
      borderWidth="0 0 1px 0"
      borderColor="lightBorder"
      backgroundColor="uiBackground"
    >
      <IconButton
        onClick={onOpen}
        title="Open sidebar (Cmd+/)"
        aria-label="Open sidebar (Cmd+/)"
      >
        <Icon icon="sidebar" />
      </IconButton>
      <Text as="h2" textAlign="center">
        {title}
      </Text>
      <div />
    </Grid>
  );
}
