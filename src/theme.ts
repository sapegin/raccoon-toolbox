import { type Config } from '@pandacss/dev';

const lightTheme = {
  gray060: '#4c4b4e',
  gray080: '#6b676f',
  gray090: '#78737d',
  gray100: '#8c8792',
  gray110: '#9c96a2',
  gray140: '#c9c4cf',
  gray150: '#dbd7e0',
  gray160: '#e8e5eb',
  gray170: '#f7f6f9',
  gray180: '#fdfdfe',
  magenta: '#ac9bc5',
  green: '#9bae7e',
  greenDimer: '#e2ebdf',
  teal: '#5f9b8d',
  blue: '#80a4be',
  redDimer: '#f2dbda',
  redContrast: '#c06159',
  orange: '#de9e59',
};
const darkTheme = {
  gray060: '#bea3d9',
  gray080: '#a88dc3',
  gray090: '#9a7eb4',
  gray100: '#866db0',
  gray110: '#8067ad',
  gray120: '#7254a6',
  gray130: '#6c5492',
  gray140: '#644e88',
  gray150: '#503f6e',
  gray160: '#453461',
  gray170: '#36294d',
  gray180: '#271e38',
  magenta: '#7f61b3',
  blue: '#5993c2',
  green: '#558240',
  greenDimer: '#37442c',
  teal: '#4f9593',
  orange: '#b18433',
  redDimer: '#552f25',
  redContrast: '#ce574a',
  brightPink: '#ca5a83',
};

export const colors = {
  background: lightTheme.gray180,
  text: lightTheme.gray090,
  accent: lightTheme.magenta,

  activeBackground: lightTheme.magenta,
  activeBorder: lightTheme.gray060,
  activeForeground: lightTheme.gray060,
  border: lightTheme.gray140,
  buttonBackground: lightTheme.gray100,
  buttonForeground: lightTheme.gray180,
  buttonHoverBackground: lightTheme.gray090,
  disabledForeground: lightTheme.gray110,
  errorBackground: lightTheme.redDimer,
  errorForeground: lightTheme.redContrast,
  hoverBackground: lightTheme.gray160,
  lightBorder: lightTheme.gray160,
  lineHighlightBackground: lightTheme.gray170,
  secondaryButtonBackground: lightTheme.gray160,
  secondaryButtonForeground: lightTheme.gray080,
  secondaryButtonHoverBackground: lightTheme.gray150,
  secondaryTextForeground: lightTheme.gray100,
  successBackground: lightTheme.greenDimer,
  textBackground: lightTheme.gray180,
  textForeground: lightTheme.gray090,
  uiBackground: lightTheme.gray170,

  codeComment: lightTheme.gray110,
  codeKeyword: lightTheme.magenta,
  codeVariable: lightTheme.blue,
  codeString: lightTheme.green,
  codeValue: lightTheme.orange,
  codeOperator: lightTheme.teal,
  codePunctuation: lightTheme.gray090,
};

const colorsDark = {
  background: darkTheme.gray180,
  text: darkTheme.gray090,
  accent: darkTheme.brightPink,

  activeBackground: darkTheme.brightPink,
  activeBorder: darkTheme.gray060,
  activeForeground: darkTheme.gray060,
  border: darkTheme.gray140,
  buttonBackground: darkTheme.gray110,
  buttonForeground: darkTheme.gray180,
  buttonHoverBackground: darkTheme.gray090,
  disabledForeground: darkTheme.gray110,
  errorBackground: darkTheme.redDimer,
  errorForeground: darkTheme.redContrast,
  hoverBackground: darkTheme.gray160,
  lightBorder: darkTheme.gray160,
  lineHighlightBackground: darkTheme.gray170,
  secondaryButtonBackground: darkTheme.gray150,
  secondaryButtonForeground: darkTheme.gray080,
  secondaryButtonHoverBackground: darkTheme.gray130,
  secondaryTextForeground: darkTheme.gray100,
  successBackground: darkTheme.greenDimer,
  textBackground: darkTheme.gray180,
  textForeground: darkTheme.gray090,
  uiBackground: darkTheme.gray170,

  codeComment: darkTheme.gray120,
  codeKeyword: darkTheme.magenta,
  codeVariable: darkTheme.blue,
  codeString: darkTheme.green,
  codeValue: darkTheme.orange,
  codeOperator: darkTheme.teal,
  codePunctuation: darkTheme.gray060,
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
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
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
} as const satisfies Config;
