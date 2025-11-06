import { cva } from '../../styled-system/css';
import { styled } from '../../styled-system/jsx';

export const text = cva({
  base: {
    color: 'text',
  },
  variants: {
    variant: {
      body: {
        fontFamily: 'body',
        fontSize: 'm',
        fontWeight: 'normal',
        lineHeight: 'base',
        letterSpacing: 'base',
      },
      bold: {
        fontFamily: 'body',
        fontSize: 'm',
        fontWeight: 'bold',
        lineHeight: 'base',
        letterSpacing: 'base',
      },
      small: {
        fontFamily: 'body',
        fontSize: 's',
        fontWeight: 'normal',
        lineHeight: 'base',
        letterSpacing: 'base',
      },
      large: {
        fontFamily: 'body',
        fontSize: 'l',
        lineHeight: 'heading',
        letterSpacing: 'base',
        color: 'activeForeground',
      },
      xlarge: {
        fontFamily: 'body',
        fontSize: 'xxxl',
        lineHeight: 'heading',
        letterSpacing: 'base',
        color: 'activeForeground',
      },
      code: {
        fontFamily: 'code',
        fontSize: 's',
        fontWeight: 'normal',
        lineHeight: 'base',
        letterSpacing: 'base',
      },
      error: {
        fontFamily: 'body',
        fontSize: 'base',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'base',
        letterSpacing: 'base',
        color: 'errorForeground',
      },
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export const Text = styled('p', text);
