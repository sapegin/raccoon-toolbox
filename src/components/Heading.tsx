import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { Box, type BoxProps } from '../../styled-system/jsx/box';

const heading = cva({
  base: {
    color: 'activeForeground',
    fontFamily: 'heading',
    fontWeight: 'heading',
    lineHeight: 'heading',
    letterSpacing: 'heading',
  },
  variants: {
    level: {
      1: {
        fontSize: 'xl',
      },
      2: {
        fontSize: 'l',
      },
      3: {
        fontSize: 'm',
      },
    },
  },
});

type HeadingProps = Omit<BoxProps, 'className'> &
  RecipeVariantProps<typeof heading>;

export function Heading({ level = 1, ...props }: HeadingProps) {
  return <Box as={`h${level}`} {...props} className={heading({ level })} />;
}
