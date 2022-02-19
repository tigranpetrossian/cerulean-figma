import type Stitches from '@stitches/react';
import { createStitches } from '@stitches/react';
import { colors, fonts, fontSizes, fontWeights, radii, sizes, space } from '@ui/theme';

const config = createStitches({
  theme: {
    colors,
    space,
    sizes,
    radii,
    fonts,
    fontSizes,
    fontWeights,
  },
  utils: {
    bgc: (value: Stitches.PropertyValue<'background'>) => ({
      backgroundColor: value,
    }),
    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),
    paddingY: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    paddingX: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    marginX: (value: Stitches.PropertyValue<'margin'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});

export const { styled, css, globalCss } = config;

export const globalStyles = globalCss({
  body: {
    margin: 0,
    fontFamily: '$base',
    fontWeight: '$base',
    fontSize: '$base',
    lineHeight: '$base',
    color: '$neutral-800',
    bg: '$white',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'transparent',

    '& *, & *::before, & *::after': {
      boxSizing: 'border-box',
    },
  },
});

export type VariantProps<T> = Stitches.VariantProps<T>;
export type CSS = Stitches.CSS<typeof config>;
