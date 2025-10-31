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
      semilarge: {
        fontFamily: 'body',
        fontSize: 'article',
        fontWeight: 'normal',
        lineHeight: 'base',
        letterSpacing: 'base',
      },
      large: {
        fontFamily: 'body',
        fontSize: 'l',
        fontWeight: 'normal',
        lineHeight: 'heading',
        letterSpacing: 'base',
      },
      menu: {
        fontFamily: 'ui',
        fontSize: 'ui',
        fontWeight: 'normal',
        lineHeight: 'base',
        letterSpacing: 'menu',
        textTransform: 'uppercase',
      },
      intro: {
        fontFamily: 'body',
        fontSize: 'article',
        fontStyle: 'italic',
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
