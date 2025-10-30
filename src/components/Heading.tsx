import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { Box, type BoxProps } from './Box';

const heading = cva({
  base: {
    color: 'text',
    fontFamily: 'heading',
    fontWeight: 'heading',
    lineHeight: 'heading',
    letterSpacing: 'heading',
  },
  variants: {
    level: {
      1: {
        fontSize: 'xxxl',
      },
      2: {
        fontSize: 'xxl',
      },
      3: {
        fontSize: 'xl',
      },
    },
  },
});

type HeadingProps = Omit<BoxProps, 'className'> &
  RecipeVariantProps<typeof heading>;

export function Heading({ level = 1, ...props }: HeadingProps) {
  return <Box as={`h${level}`} {...props} className={heading({ level })} />;
}
