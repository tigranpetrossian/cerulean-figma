import chroma from 'chroma-js';
import { Color, Palette } from 'types';
import * as R from 'remeda';

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

function singleStyleToColor(style: PaintStyle): Color {
  const { paints } = style;

  if (!paints[0]) {
    return {
      id: style.id,
      name: style.name,
      value: null,
      alpha: null,
      error: 'MISSING_COLOR',
    };
  }

  if (!isSolidFigmaPaint(paints[0])) {
    return {
      id: style.id,
      name: style.name,
      value: null,
      alpha: null,
      error: 'NOT_SOLID',
    };
  }

  return {
    id: style.id,
    name: style.name,
    value: figmaRgbToHSV(paints[0].color),
    alpha: paints[0].opacity ?? 1,
    error: null,
  };
}

const STYLE_NAME_PATTERN = /^\$(?<name>[a-z][a-z-\s]*)-(?<index>\d{1,4})$/;

export function figmaStylesToPalette(styles: PaintStyle[]): Palette[] {
  return R.pipe(
    styles,
    R.reduce<PaintStyle, (PaintStyle & { paletteName: string; index: number })[]>(
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
}
