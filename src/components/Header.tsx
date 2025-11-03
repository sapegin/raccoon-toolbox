import { Grid } from './Grid';
import { Text } from './Text';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { APP_NAME } from '../constants';
import { Box } from './Box';
import { getShortcut } from '../util/getShortcut';

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
    <Box
      overflowY="hidden"
      transition="height 0.08s ease-in-out"
      inert={show === false}
      aria-hidden={show === false}
      height={show ? '2.3rem' : 0}
    >
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
          label={`Open sidebar (${getShortcut('/')})`}
          onClick={onOpen}
        >
          <Icon icon="sidebar" />
        </IconButton>
        <Text as="h2" textAlign="center">
          {title}
        </Text>
        <div />
      </Grid>
    </Box>
  );
}
