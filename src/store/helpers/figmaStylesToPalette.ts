import chroma from 'chroma-js';
import { Color, Palette } from 'types';
import * as R from 'remeda';

type FigmaPaintStyle = Pick<PaintStyle, 'id' | 'name' | 'paints'>;

function figmaRgbToHSV({ r, g, b }: RGB) {
  const [h, s, v] = chroma.rgb(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)).hsv();

  return {
    h: isNaN(h) ? 0 : Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function isSolidFigmaPaint(paint: Paint): paint is SolidPaint {
  return paint.type === 'SOLID';
}

function singleStyleToColor(style: FigmaPaintStyle): Color {
  const { paints } = style;

  if (!paints[0]) {
    return {
      id: style.id,
      name: style.name,
      value: null,
      errors: ['MISSING_COLOR'],
    };
  }

  if (!isSolidFigmaPaint(paints[0])) {
    return {
      id: style.id,
      name: style.name,
      value: null,
      errors: ['NOT_SOLID'],
    };
  }

  if (style.name.startsWith('$-some')) {
    console.log(paints);
  }

  return {
    id: style.id,
    name: style.name,
    // TODO: use opacity when calculating the color
    value: figmaRgbToHSV(paints[0].color),
    errors: [],
  };
}

const STYLE_NAME_PATTERN = /^\$(?<name>[a-zA-Z-]*)-(?<index>\d{1,4})$/;

// TODO:
// filter the ones starting with one $ ($$neutral, or $$-neutral, use regex)
// group by prefix (palette name/id) is the prefix
// Add type guard for isSolid(paint): paint is SolidPaint
// If doesn't have paint at index 0, mark as invalid

export function figmaStylesToPalette(styles: FigmaPaintStyle[]): Palette[] {
  const result = R.pipe(
    styles,
    R.reduce<FigmaPaintStyle, (FigmaPaintStyle & { paletteName: string; index: number })[]>(
      (result, style) => {
        const nameMatch = STYLE_NAME_PATTERN.exec(style.name);

        if (nameMatch && nameMatch.groups) {
          result.push({
            ...style,
            paletteName: nameMatch.groups.name,
            index: parseInt(nameMatch.groups.index, 10),
          });
        }

        return result;
      },
      []
    ),
    R.groupBy((style) => style.paletteName),
    (groups) => {
      return Object.entries(groups).map<Palette>(([name, styles]) => {
        return {
          name,
          colors: styles.map(singleStyleToColor),
        };
      });
    }
  );

  return result;
}
