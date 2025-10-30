import { type Config } from '@pandacss/dev';

const lightTheme = {
  gray060: '#4c4b4e',
  gray090: '#78737d',
  gray140: '#c9c4cf',
  gray160: '#e8e5eb',
  gray170: '#f7f6f9',
  gray180: '#fdfdfe',
  magenta: '#ac9bc5',
};
const darkTheme = {
  gray060: '#bea3d9',
  gray090: '#9a7eb4',
  gray140: '#644e88',
  gray160: '#453461',
  gray170: '#36294d',
  gray180: '#271e38',
  brightPink: '#ca5a83',
};

export const colors = {
  background: lightTheme.gray180,
  text: lightTheme.gray090,
  activeForeground: lightTheme.gray060,
  activeBackground: lightTheme.magenta,
  textBackground: lightTheme.gray180,
  buttonForeground: lightTheme.gray180,
  textForeground: lightTheme.gray090,
  uiBackground: lightTheme.gray170,
  border: lightTheme.gray140,
  lightBorder: lightTheme.gray160,
  hoverBackground: lightTheme.gray160,
};

const colorsDark = {
  background: darkTheme.gray180,
  text: darkTheme.gray090,
  activeForeground: darkTheme.gray060,
  activeBackground: darkTheme.brightPink,
  textBackground: darkTheme.gray180,
  buttonForeground: darkTheme.gray180,
  textForeground: darkTheme.gray090,
  uiBackground: darkTheme.gray170,
  border: darkTheme.gray140,
  lightBorder: darkTheme.gray160,
  hoverBackground: darkTheme.gray160,
};

export const lineHeights = {
  base: '1.5',
  small: '1.4',
  heading: '1.1',
  code: '1.3',
};

function createPalette(
  light: Record<string, string>,
  dark: Record<string, string>
) {
  const palette: Record<string, { value: { base: string; _osDark: string } }> =
    {};
  for (const name in light) {
    palette[name] = {
      value: { base: light[name], _osDark: dark[name] },
    };
  }
  return palette;
}

export const theme = {
  theme: {
    extend: {
      tokens: {
        fonts: {
          body: { value: "'Helvetica Neue', Arial, sans-serif" },
          heading: { value: "'Mondwest-Regular', sans-serif" },
          ui: { value: 'NeueBit, sans-serif' },
          code: { value: 'MonoLisa, monospace' },
        },
        fontSizes: {
          base: { value: '1rem' },
          xxxl: { value: '3.2rem' },
          xxl: { value: '2.4rem' },
          xl: { value: '2rem' },
          l: { value: '1.7rem' },
          m: { value: '1rem' },
          s: { value: '0.9rem' },
          xs: { value: '0.75rem' },
        },
        fontWeights: {
          normal: { value: '400' },
          heading: { value: '300' },
          bold: { value: '800' },
        },
        lineHeights: {
          base: { value: lineHeights.base },
          small: { value: lineHeights.small },
          heading: { value: lineHeights.heading },
          code: { value: lineHeights.code },
        },
        letterSpacings: {
          base: { value: '0' },
          heading: { value: '0' },
          menu: { value: '0.1ch' },
        },
        radii: {
          // TODO: default -> base
          default: { value: '2px' },
          large: { value: '3px' },
        },
        easings: {
          fade: { value: 'ease-out' },
          fadeout: { value: 'ease-out' },
          hover: { value: 'ease-in' },
        },
        durations: {
          fade: { value: '0.15s' },
          fadeout: { value: '1s' },
          hover: { value: '0.1s' },
        },
      },
      semanticTokens: {
        colors: createPalette(colors, colorsDark),
        fontSizes: {
          root: { value: '1.125em' },
          article: { value: '1.2rem' },
          ui: { value: '1.5rem' }, // UI font is very small
        },
        spacing: {
          listMargin: { value: '0' },
        },
      },
    },
  },

  // TODO: Extract
  // Code styles
  globalCss: {
    pre: {
      display: 'block',
      lineHeight: 'code',
      fontSize: 's',
      fontFamily: 'code',
      fontStyle: 'normal',
      whiteSpace: 'pre-wrap',
      tabSize: 4,
      textSizeAdjust: 'none',
      // Expand background for dark themes
      height: '100%',
      marginInline: { base: '-m', tablet: '-s' },
      padding: { base: 'm', tablet: 's' },
      borderRadius: { tablet: 'default' },
    },
    'pre code': {
      display: 'block',
      fontSize: 'inherit',
      fontStyle: 'inherit',
      color: 'inherit',
    },
    '[data-highlighted-line]': {
      backgroundColor: { base: '#f5f5f7', _osDark: '#3a3d40' },
    },

    // HACK: Override default Astro/Shiki styles
    '.astro-code[style], .shiki[style]': {
      overflowX: 'visible!important',
    },
  },
} as const satisfies Config;
