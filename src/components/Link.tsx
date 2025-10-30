import { link } from '../../styled-system/patterns/link';
import { Box, type BoxProps } from './Box';

export type LinkProps = Omit<BoxProps, 'className'>;

/**
 * Text link.
 */
export function Link(props: LinkProps) {
  return <Box as="a" {...props} className={link()} />;
}
